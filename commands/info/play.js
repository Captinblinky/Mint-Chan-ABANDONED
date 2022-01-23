const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { joinVoiceChannel } = require('@discordjs/voice');
const Discord = require("discord.js");

//Queue(message.guild.id, queue constructor object { voice channel, text channel, connection, song()})
const queue = new Map();

module.exports = {
    name: 'play',
    aliases: ['skip', 'stop'],
    permissions: [],
    devOnly: false,
    run: async({ client, message, args, cmdstr }) => {

        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.reply("You need to be in a voice channel dummy!~");

        const server_queue = queue.get(message.guild.id);

        if (cmdstr === "play") {
            if (!args.length) return message.channel.send("You didn't even give me a song to play you stupid baka! >w<");
            let song = {};

            if (ytdl.validateURL(args[0])) {
                const song_info = await ytdl.getInfo(args[0]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }
            } else {
                //If the video is not a URL
                const video_finder = async(query) => {
                    const videoResult = await ytSearch(query);
                    return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
                }

                const video = await video_finder(args.join(' '));
                if (video) {
                    song = { title: video.title, url: video.url }
                } else {
                    message.channel.send("I wasn't able to find any videos like that senpai ;A;");
                }
            }

            if (!server_queue) {
                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    connection: null,
                    songs: []
                }
                queue.set(message.guild.id, queue_constructor);
                queue_constructor.songs.push(song);

                try {
                    const connection = joinVoiceChannel({
                        channelId: message.member.voice.channel,
                        guildId: message.guild.id,
                        adapterCreator: message.guild.voiceAdapterCreator
                    });
                    queue_constructor.connection = connection;
                    video_player(message.guild, queue_constructor.songs[0]);
                } catch (err) {
                    queue.delete(message.guild.id);
                    message.channel.send("Oopsie Woopsie, There was a little Fucky Wucky connecting to the voice channel ;3");
                    throw err;
                }
            } else {
                server_queue.songs.push(song);
                return message.channel.send(`${song.title} was added to the queue!~`);
            }
        }
    }
}

const video_player = async(guild, song) => {
    const song_queue = queue.get(guild.id);

    if (!song) {
        song_queue.voice_channel.leave();
        queue.delete(guild.id);
        return;
    }
    const stream = ytdl(song.url, { filter: 'audioonly' });
    song_queue.connection.play(stream, { seek: 0, volume: 0.5 })
        .on('finish', () => {
            song_queue.songs.shift();
            video_player(guild, song_queue.songs[0]);
        });

    await song_queue.text_channel.send(`Now Playing ${song.title}`);
}