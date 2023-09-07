import { getPermissionsAsync, getContactsAsync, Fields, PermissionStatus, requestPermissionsAsync } from 'expo-contacts';
import { unique } from '../helper/helper';

const loadContacts = async () => {
    const { data } = await getContactsAsync({
        fields: [Fields.FirstName, Fields.Nickname, Fields.Name],
    });

    contacts = data
        .map(({ firstName, nickname, name }) => nickname ?? firstName ?? name)
        .filter(unique);
};

(async () => {
    const { status } = await getPermissionsAsync();
    permission = status;

    if (status === PermissionStatus.GRANTED) loadContacts();
})();


export const requestPermission = async () => {
    const { status } = await requestPermissionsAsync();
    permission = status;

    if (status === PermissionStatus.GRANTED) loadContacts();
};


export let permission: PermissionStatus = PermissionStatus.UNDETERMINED;
export let contacts: string[] = [];