export class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  static isValidEmail(email: string): boolean {
    return email.endsWith("@alu.ufc.br");
  }
}