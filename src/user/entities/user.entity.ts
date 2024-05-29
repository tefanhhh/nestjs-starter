import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity({
  name: 'user',
})
export class User {
  @ObjectIdColumn()
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
