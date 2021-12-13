import * as Network from 'expo-network';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Data{
    async validateVersion(){
        const token = await AsyncStorage.getItem('token')
        const currentversion = await AsyncStorage.getItem('currentversion')
        let response = false;
        await fetch('https://expoapp.bodypower.com/api/version', {
            method: 'GET',
            headers: {
                //Header Defination
                'Content-Type':
                'application/json',
                'Authorization':
                'Bearer ' + token,
            },
        }).then(async (serverversion) => {
            await serverversion.json().then(async (latestversion) => {
                console.log(`Server version`)
                if (latestversion.version == JSON.parse(currentversion).version){
                    response = true;
                }
            })
        })
        return response;
    }
    
    async versionNotNull(){
        const currentversion = await AsyncStorage.getItem('currentversion')
        if(currentversion == null){
            return false;
        }else{
            return true;
        }
    }
    
    async network(){
        const network = await Network.getNetworkStateAsync()
        if(network.isConnected){
            return true;
        }else{
            return false;
        }
    }
    
    async downloadData(){
        const token = await AsyncStorage.getItem('token')
        await fetch('https://expoapp.bodypower.com/public/api/zones', {
        method: 'GET',
        headers: {
            //Header Defination
            'Content-Type':
            'application/json',
        },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            AsyncStorage.setItem('zones', JSON.stringify(responseJson));
        })
        await fetch('https://expoapp.bodypower.com/public/api/map', {
        method: 'GET',
        headers: {
            //Header Defination
            'Content-Type':
            'application/json',
        },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            AsyncStorage.setItem('map', JSON.stringify(responseJson));
        })
        await fetch('https://expoapp.bodypower.com/public/api/events', {
        method: 'GET',
        headers: {
            //Header Defination
            'Content-Type':
            'application/json',
        },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            AsyncStorage.setItem('events', JSON.stringify(responseJson));
        })
        await fetch('https://expoapp.bodypower.com/public/api/guests', {
        method: 'GET',
        headers: {
            //Header Defination
            'Content-Type':
            'application/json',
        },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            AsyncStorage.setItem('guests', JSON.stringify(responseJson));
        })
        await fetch('https://expoapp.bodypower.com/api/version', {
            method: 'GET',
            headers: {
            //Header Defination
            'Content-Type':
            'application/json',
            },
        }).then(async (serverversion) => {
            await serverversion.json().then(async (latestversion) => {
                console.log("Setting new server version");
                AsyncStorage.setItem('currentversion', JSON.stringify(latestversion));
            })
        })
        
    }

    async getData(dataname : string){
        if(await this.network){
            if(await this.versionNotNull()){
                console.log('1')
                console.log(await this.validateVersion());
                if(await this.validateVersion() == true){
                    console.log('2')
                    const data = await AsyncStorage.getItem(dataname)
                    return JSON.parse(data);
                }else{
                    console.log('4')
                    console.log(await this.downloadData());
                    const data = await AsyncStorage.getItem(dataname)
                    return JSON.parse(data);
                }
            }else{
                console.log('3')
                console.log("test" + await this.versionNotNull());
                await this.downloadData();
                const data = await AsyncStorage.getItem(dataname)
                return JSON.parse(data);
            }
        }else{
            console.log('4')
            if(await this.versionNotNull()){
                console.log('5')
                const data = await AsyncStorage.getItem(dataname)
                return JSON.parse(data);
            }else{
                console.log('6')
                return {"message" : "Please Connect to internet"}
            }
        }
        // if(dataname == "zones"){
        //     return require('./zones.json');
        // }
        // if(dataname == "events"){
        //     return require('./events.json');
        // }
        // if(dataname == "map"){
        //     return require('./map.json');
        // }
        // if(dataname == "version"){
        //     return require('./version.json');
        // }
        // if(dataname == "guests"){
        //     return require('./guests.json');
        // }
        // if(dataname == "user"){
        //     return require('./user.json');
        // }
    }

}


// export const zones = async() => {
//     await Network.getNetworkStateAsync().then(async (network) => {
    //         await AsyncStorage.getItem('token').then(async (token) => {
//             if(network.isConnected){
//                 await AsyncStorage.getItem('currentversion').then(async (currentversion) => {
    //                     await fetch('https://expoapp.bodypower.com/api/version', {
        //                     method: 'GET',
        //                     headers: {
//                         //Header Defination
//                         'Content-Type':
//                         'application/json',
//                         'Authorization':
//                         'Bearer ' + token,
//                     },
//                     }).then(async (serverversion) => {
//                         await serverversion.json().then(async (latestversion) => {
//                             if(currentversion != null){
//                                 if(JSON.parse(currentversion).version == latestversion.version){
//                                     await AsyncStorage.getItem('zones').then((zones) => {
//                                         return JSON.parse(zones);
//                                     })
//                                 }else{
//                                     await fetch('https://expoapp.bodypower.com/public/api/zones', { 
//                                     method: 'GET',
//                                     headers: {
//                                             //Header Defination
//                                             'Content-Type':
//                                             'application/json',
//                                             'Authorization':
//                                             'Bearer ' + token,
//                                         },
//                                     }).then(response => {

//                                     })
//                                 }
//                             }
    
//                         })
//                     })
//                 })
//             }else{

//             }
//         })
//     })
// }