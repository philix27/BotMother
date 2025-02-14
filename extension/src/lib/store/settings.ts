import { appPersistWritable } from './persistSettings';

export const drawerState = appPersistWritable<boolean>('drawer', false);
export const isLoud = appPersistWritable<boolean>('isLoud', false);

export type IKycScreen = 'Name' | 'ProfilePic' | 'BVN' | 'NIN' | 'Email' | 'Phone' | 'NONE';
type IKYC = {
	activeKycSheet?: IKycScreen;
	firstName?: string;
	lastName?: string;
	middleName?: string;
	address1?: string;
	address2?: string;
	walletAddress?: string;
	nin?: string;
	bvn?: string;
	dob?: string;
};

export const userInfo = appPersistWritable<IKYC>('userInfo', {});

