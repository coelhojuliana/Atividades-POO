
const readline = require('readline-sync');
let input = () => readline.question();
let write = (x: any) => process.stdout.write("" + x);

class User{
    private username: string;
    private inbox: Inbox;
    private followers: Map<string, User>
    private following: Map<string, User>
    constructor(username: string){
        this.username = username;
        this.inbox = new Inbox();
        this.followers = new Map<string, User>();
        this.following = new Map<string, User>();
    }
    public toString(): string{
        let seguidores = this.followers.keys();
        let seguindo =  this.following.keys();
        return this.username + "\nSeguidores [" + [...seguidores].join(", ") + "] \nSeguindo [" + [...seguindo].join(", ") + "]\n";
    }
    public follow(other: User){
        let chave = other.username;
        if(chave == this.username){
            console.log("ERRO: Não pode seguir a si mesmo.");
            return
        }
        if(this.following.has(chave)){
            console.log("ERRO: Já está seguindo o usuário.");
            return
        }
        this.following.set(chave, other);
        other.followers.set(this.username, this);
    }
    public getInbox(): Inbox{
        return this.inbox;
    }
    public sendTweet(tw: Tweet){
        this.inbox.myTweets.set(tw.id, tw);
        this.inbox.timeline.set(tw.id, tw);
        for(let user of this.followers.values()){
            user.inbox.timeline.set(tw.id, tw);
        }
    }
    public unfollow(other: User){
        if(this.following.has(other.username) !== true){
            console.log("ERRO: Não há usuário correspondente.");
            return
        }
        let user = this.following.get(other.username);
        if(user !== undefined){
            this.following.delete(user.username);
            this.inbox.rmMsgsFrom(user.username);
            user.followers.delete(this.username);
        }
    }
    public like(id: number){
        let tw = this.inbox.getTweet(id);
        tw.like(this.username);
    }
    public unfollowAll(){
        for(let seguindo of this.following.values()){
            seguindo.followers.delete(this.username);
        }
    }
    public rejectAll(){
        for(let seguidores of this.followers.values()){
            seguidores.following.delete(this.username);
            seguidores.inbox.rmMsgsFrom(this.username);
        }
    }
}

class Controller{
    nextTweetId: number;
    users: Map<string, User>;
    tweets: Map<number, Tweet>;
    constructor(){
        this.nextTweetId = 0;
        this.users = new Map<string, User>();
        this.tweets = new Map<number, Tweet>();
    }
    public addUser(username: string){
        if(this.users.has(username)){
            console.log("ERRO: O usuário já está cadastrado.");
            return;
            //throw new Error("ERRO: O usuário já está cadastrado.");
        }
        let user = new User(username);
        this.users.set(username, user);
    }
    public toString(): string{
        let user: Array<User> = [];
        for(let usu of this.users.values()){
            user.push(usu);
        }
        return [...user].join("\n");
    }
    public createTweet(sender: string, msg: string): Tweet{
        let tweet = new Tweet(this.nextTweetId, sender, msg);
        this.nextTweetId += 1;
        this.tweets.set(tweet.id, tweet);
        return tweet;
    }
    public getUser(username: string): User {
        if(this.users.has(username) === true){
            let user: undefined | User = this.users.get(username);
            if(user !== undefined){
                return user;
            }
            throw new Error("Usuário indefinido");
        }
        throw new Error("Não foi encontrado usuário.");
    }
    public sendTweet(username: string, msg: string){
        if(this.users.has(username)){
            let user = this.getUser(username);
            let tweet = this.createTweet(username, msg);
            user.sendTweet(tweet);
        } 
        console.log("ERRO: Usuário não encontrado.");
        // let user = this.getUser(username);
        // let tweet = this.createTweet(username, msg);
        // user.sendTweet(tweet);
    }
    public sendRt(username: string, twId: number, rtMsg: string){
        if(this.users.has(username) === false){
            console.log("ERRO: Usuário não encontrado.");
            return
            //throw new Error("Usuário não encontrado.");
        }
        let user = this.getUser(username);
        let inbox = user.getInbox();
        let tw_ori = inbox.getTweet(twId);
        let newtw = this.createTweet(username, rtMsg);
        if(tw_ori === undefined){
            console.log("ERRO: Tweet original não definido");
            return
            //throw new Error("Tweet original não definido.");
        }
        newtw.setRt(tw_ori);
        this.tweets.set(newtw.id, newtw);
        user.sendTweet(newtw); 
        
        
    }
    public rmUser(username: string){
        let user = this.users.get(username);
        if(user === undefined){
            console.log("Usuário não definido.");
            return
            //throw new Error("Usuário indefinido."); 
        }
        let inbox = user.getInbox();
        user.unfollowAll();
        user.rejectAll();
        for(let tw of inbox.myTweets.values()){
            tw.setDeleted();
        }
        this.users.delete(username);
    }
}

class Inbox{
    timeline: Map<number, Tweet>;
    myTweets: Map<number, Tweet>;
    constructor(){
        this.timeline = new Map<number, Tweet>();
        this.myTweets = new Map<number, Tweet>();
    }
    public storeInTl(tweet: Tweet){
        this.timeline.set(tweet.getId(), tweet);
    }
    public getTl(): Array<Tweet>{
        let lista: Array<Tweet> = [];
        for(let tw of this.timeline.values()){
            if(tw.isDeleted() !== false){
                lista.push(tw);
            }
        }
        return lista;
    }
    public toString(): string{
        let lista: Array<string> = [];
        for(let tweet of this.timeline.values()){
            lista.push(tweet.toString());
        }
        return [...lista].join("\n");
    }
    public getTweet(id: number): Tweet{
        if(this.timeline.has(id)){
            let tw = this.timeline.get(id);
            if(tw !== undefined){
                return tw;
            } 
            throw new Error("Tweet é indefinido");
        } 
        throw new Error("Não há tweet com essa id");
    }
    public rmMsgsFrom(username: string){
        for(let tweets of this.timeline.values()){
            //fazer lista com ids pra deletar se não der certo
            if(tweets.username == username){
                this.timeline.delete(tweets.id);
            }
        }
    }
    public storeInMyTweets(tweet: Tweet){
        this.myTweets.set(tweet.getId(), tweet);
    }
    public getMyTweets(): Array<Tweet>{
        let lista: Array<Tweet> = [];
        for(let tw of this.myTweets.values()){
            lista.push(tw);
        }
        return lista;
    }
}

class Tweet{
    id: number;
    username: string;
    msg: string;
    likes: Array<string>;
    deleted: boolean;
    rt: Tweet | null;
    constructor(id: number, username: string, msg: string){
        this.id = id;
        this.username = username;
        this.msg = msg;
        this.likes = new Array<string>();
        this.deleted = false;
        this.rt = null;
    }
    public getId(): number{
        return this.id;
    }
    public getSender(): string{
        return this.username;
    }
    public getMsg(): string{
        return this.msg;
    }
    public  toString(): string{
        let corpo = this.getId() + ":" + this.getSender() + " (" + this.getMsg() + ") " + "[" + this.getLikes().join(", ") + "]";
        if(this.rt !== null){
            return corpo + "\n    " + this.rt.getId() + ": " + this.rt.getSender() + " (" + this.rt.getMsg() + ")" + "[" + this.rt.getLikes().join(", ") + "]";
        }
        return corpo;
    }
    public like(username: string){
        for(let nome of this.likes){
            if(username == nome){
                console.log("Não pode curtir duas vezes o mesmo tweet");
                return
            }
        }
        this.likes.push(username);
    }
    public getLikes(): Array<string>{
        return this.likes;
    }
    public setRt(tw: Tweet){
        this.rt = tw;
    }
    public setDeleted(){
        this.deleted = true;
        this.username = "";
        this.msg = "Este tweet foi excluído.";
    }
    public isDeleted(): boolean{
        return this.deleted;
    }
}

class IO{
    shell(){
        let sistema = new Controller();
        while(true){
            let line = input();
            let words = line.split(" ");
            if(words[0] == "end"){
                break;
            } else if(words[0] == "add"){
                sistema.addUser(words[1]);
            } else if(words[0] == "rm"){
                sistema.rmUser(words[1]);
            }else if(words[0] == "show"){
                console.log(sistema.toString());
            }else if(words[0] == "follow"){
                sistema.getUser(words[1]).follow(sistema.getUser(words[2]));
            } else if(words[0] == "unfollow"){
                sistema.getUser(words[1]).unfollow(sistema.getUser(words[2]));
            } else if(words[0] == "twittar"){
                let aux = "  " + words[0] + words[1];
                let msg = line.slice(aux.length);
                sistema.getUser(words[1]).sendTweet(sistema.createTweet(words[1], msg));
            } else if(words[0] == "like"){
                sistema.getUser(words[1]).like(parseInt(words[2]));
                
            } else if(words[0] == "timeline"){
                let msgs = sistema.getUser(words[1]).getInbox()
                console.log(msgs.toString());
            } else if(words[0] == "rt"){
                let aux = "   " + words[0] + words[1] + words[2];
                let msg = line.slice(aux.length);
                sistema.sendRt(words[1], parseInt(words[2]), msg);
               
            }else{
                console.log("Comando inválido \n");
            }
        }
    }
}

let io = new IO();
io.shell();


