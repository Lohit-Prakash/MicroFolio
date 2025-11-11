import { ConnectorConfig, DataConnect, QueryRef, QueryPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface DummyData {
  __typename?: string | null;
}

export interface Education_Key {
  id: UUIDString;
  __typename?: 'Education_Key';
}

export interface Experience_Key {
  id: UUIDString;
  __typename?: 'Experience_Key';
}

export interface Project_Key {
  id: UUIDString;
  __typename?: 'Project_Key';
}

export interface Research_Key {
  id: UUIDString;
  __typename?: 'Research_Key';
}

export interface Skill_Key {
  id: UUIDString;
  __typename?: 'Skill_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface DummyRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<DummyData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<DummyData, undefined>;
  operationName: string;
}
export const dummyRef: DummyRef;

export function dummy(): QueryPromise<DummyData, undefined>;
export function dummy(dc: DataConnect): QueryPromise<DummyData, undefined>;

