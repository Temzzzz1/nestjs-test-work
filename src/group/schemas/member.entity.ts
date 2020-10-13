import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, PrimaryColumn } from 'typeorm';

@Entity()
export class Member {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  groupId: number;

  @Column()
  userId: number;

}