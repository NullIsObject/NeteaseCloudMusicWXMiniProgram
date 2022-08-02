export default {
    methods: {
        playThatMusic() {
            //播放当前音乐
            this.$api.songUrl(this.pageMusicId).then((res) => {
                const src = res.data.data[0].url;
                this.$store.dispatch("player/startPlayMusic", {
                    musicID:this.musicData.id,
                    src,
                    title: this.musicData.name,
                    coverImgUrl: this.musicData.al.picUrl,
                    singer: this.musicData.al.name,
                });
            });
        },
    }
}