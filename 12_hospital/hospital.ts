class Paciente{
    private nome: string;
    private doenca: string;
    private medicos: Map<string, Medico>;

    constructor(nome: string, doenca: string){
        this.nome = nome;
        this.doenca = doenca;
        this.medicos = new Map<string, Medico>();
    }
    
    public getNome(): string{
        return this.nome;
    }

    public getDoenca(){
        return this.doenca;
    }

    public getMedicos(): string[]{
        return [...this.medicos.keys()];
    }

    public addMedicos(medico: Medico): void{
        let chave = medico.getNome();
        if(this.medicos.has(chave)){
            return;
        }
        this.medicos.set(chave, medico);
        medico.addPaciente(this);
    }

    public rmvMedico(chave: string): void{
        let medico: undefined | Medico = this.medicos.get(chave);
        if(medico !== undefined){
            this.medicos.delete(chave)
            medico.rmvPaciente(this.nome);
        }
    }

    public toString(): string{
        let chaves = this.medicos.keys();
        return this.nome + " [" + [...chaves].join(", ") + "]";
    }
}

class Medico{
    private nome: string;
    private especialidade: string;
    private pacientes: Map<string, Paciente>;

    constructor(nome: string, especialidade: string){
        this.nome = nome;
        this.especialidade = especialidade;
        this.pacientes = new Map<string, Paciente>();
    }

    public getNome(): string{
        return this.nome;
    }

    public getPacientes(): string[]{
        return [...this.pacientes.keys()];
    }

    public getEsp(): string{
        return this.especialidade;
    }

    public addPaciente(paciente: Paciente): void{
        let chave = paciente.getNome();
        if(this.pacientes.has(chave)){
            return;
        }
        this.pacientes.set(chave, paciente);
        paciente.addMedicos(this);
    }

    public rmvPaciente(chave: string): void{
        let paciente: undefined | Paciente = this.pacientes.get(chave);
        if(paciente !== undefined){
            this.pacientes.delete(chave);
            paciente.rmvMedico(this.nome);
        }
    }

    public toString(): string{
        let chaves = this.pacientes.keys();
        return this.nome + " [" + [...chaves].join(", ") + "]";
    }
}

class Hospital{
    private pacientes: Map<string, Paciente>;
    private medicos: Map<string, Medico>;
    constructor(){
        this.pacientes = new Map<string, Paciente>();
        this.medicos = new Map<string, Medico>();
    }

    public conferir(key_pac: string, key_med: string): void{
        let paciente = this.getPaciente(key_pac);
        let medico = this.getMedico(key_med);

        for(let med of paciente.getMedicos()){
            if(this.getMedico(med).getEsp() == medico.getEsp()){
                throw new Error("O Paciente já possui um médico com esta especialidade");
            }
        }
    }

    public addPaciente(paciente: Paciente): void{
        let chave = paciente.getNome();
        if(this.pacientes.has(chave)){
            return;
        }
        this.pacientes.set(chave, paciente);
        console.log("Paciente " + chave + " [" + paciente.getDoenca() +"]" + " adicionado com sucesso");
    }

    public addMedico(medico: Medico){
        let chave = medico.getNome();
        if(this.medicos.has(chave)){
            return;
        }
        this.medicos.set(chave, medico);
        console.log("Médico " + chave + " [" + medico.getEsp() +"]" +" adicionado com sucesso");
    }

    public getPaciente(nome: string): Paciente{
        let paciente = this.pacientes.get(nome);
        if(paciente === undefined){
            throw new Error("O Paciente não foi encontrado");
        }
        return paciente;
    }

    public getMedico(nome: string): Medico{
        let medico = this.medicos.get(nome);
        if(medico === undefined){
            throw new Error("O Médico não foi encontrado");
        }
        return medico;
    }

    public vincular(paciente: string, medico: string): void{
        this.conferir(paciente, medico);
        this.getPaciente(paciente).addMedicos(this.getMedico(medico));
        console.log("Médico " + medico + " e Paciente " + paciente + " vinculados com sucesso");
    }

    public desvincular(paciente: string, medico: string): void{
        this.getPaciente(paciente).rmvMedico(medico);
        console.log("Médico " + medico + " e Paciente " + paciente + " desvinculados com sucesso");
    }

    public rmvPaciente(nome: string): void{
        let paciente = this.getPaciente(nome);
        for(let med of paciente.getMedicos()){
            paciente.rmvMedico(med);
        }
        this.pacientes.delete(nome);
        console.log("Paciente " + nome + " removido com sucesso");
    }

    public rmvMedico(nome: string): void{
        let medico = this.getMedico(nome);
        for(let pac of medico.getPacientes()){
            medico.rmvPaciente(pac);
        }
        this.medicos.delete(nome);
        console.log("Médico " + nome + " removido com sucesso");
    }

    public toString(): string{
        let pacientes = [...this.pacientes.values()].map(p => p.toString());
        let medicos = [...this.medicos.values()].map(m => m.toString());
        return "Pacientes ---\n" + pacientes.join("\n") + "\nMédicos ---\n" + medicos.join("\n");
    }
}

let hosp = new Hospital();
hosp.addPaciente(new Paciente("Ellie", "ansiedade"));
hosp.addPaciente(new Paciente("Mila", "pé quebrado"));

hosp.addMedico(new Medico("Vini", "Ortopedista"));
hosp.addMedico(new Medico("Sabrina", "Psiquiatra"));
hosp.addMedico(new Medico("Márcia", "Psiquiatra"));

console.log("----- PACIENTES E MEDICOS ADICIONADOS");

hosp.vincular("Ellie", "Sabrina");
hosp.vincular("Mila", "Vini");

console.log("----- PACIENTES E MEDICOS VINCULADOS");

console.log("----- MOSTRANDO OS PACIENTES E MEDICOS");
console.log(hosp.toString());

console.log("----- REMOVENDO PACIENTE");
hosp.rmvPaciente("Ellie");
console.log(hosp.toString());

console.log("----- REMOVENDO MEDICO");
hosp.rmvMedico("Vini");
console.log(hosp.toString());

console.log("----- VINCULANDO 2 MEDICOS DO MESMO TIPO");
hosp.vincular("Mila", "Márcia");
hosp.vincular("Mila", "Sabrina");
