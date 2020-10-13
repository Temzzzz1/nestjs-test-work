import { Entity, Column, JoinTable, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Friend {
  
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: number;

  @Column()
  friendId: number;
}