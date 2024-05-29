import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'user',
})
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({
    type: 'varchar',
    name: 'username',
    length: 25,
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    name: 'password',
    length: 250,
    nullable: false,
  })
  password: string;

  @Column({
    name: 'role',
    type: 'enum',
    enum: ['USER', 'ADMIN'],
    nullable: false,
  })
  role: string;
}
