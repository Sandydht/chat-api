export class CreateUserDto {
  readonly photo_url?: string;
  readonly name: string;
  readonly phone_number: string;
  readonly password: string;
}