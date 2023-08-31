new Vue({
    el: '#desafio',
    data:{
        running: false,
        saudeJogador: 100,
        saudeMonstro: 100,
        logs:[],
    },
    computed:{
        hasResult(){
            return this.saudeJogador == 0 || this.saudeMonstro == 0
        }

    },
    methods:{
        startGame(){
            this.running = true
            this.saudeJogador = 100
            this.saudeMonstro = 100
            this.logs = []
        },
        attack(especial){
            this.hurt('saudeMonstro', 5, 10, especial, 'Jogador', 'Monstro', 'player')
            if(this.saudeMonstro > 0){
                this.hurt('saudeJogador', 7, 12, false, 'Monstro', 'Jogador', 'monster')
            }
            
        },
        hurt(prop, min, max, especial, source, target, cls){
            const plus = especial ? 5 : 0
            const hurt = this.getRandom(min + plus, max + plus)
            this[prop] = Math.max(this[prop] - hurt, 0)
            this.registerLog(`${source} atingiu ${target} com ${hurt}.`, cls)
        },
        healAndHurt(){
            this.heal(10, 15)
            this.hurt('saudeJogador', 7, 12, false, 'Monstro', 'Jogador', 'monster')
        },
        heal(min, max){
            const heal = this.getRandom(min, max)
            this.saudeJogador = Math.min(this.saudeJogador + heal, 100)
            this.registerLog(`Jogador ganhou força de ${heal}.`, 'player')
        },
        getRandom(min, max){
            const value = Math.random() * (max - min) + min
            return Math.round(value)
        },
        registerLog(text, cls){
            this.logs.unshift({text, cls})
        }
    },
    watch:{
        hasResult(value){
            if(value) this.running = false
        }
    }
})