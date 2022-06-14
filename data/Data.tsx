import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Data{
    async validateVersion(){
        const currentversion = await AsyncStorage.getItem('currentversion')
        let response = false;
        await fetch('https://expoapp.bodypower.com/api/version', {
            method: 'GET',
            headers: {
                //Header Defination
                'Content-Type':
                'application/json'
            },
        }).then(async (serverversion) => {
            await serverversion.json().then(async (latestversion) => {
                // console.log(`local version`)
                // console.log(currentversion)
                // console.log(`Server version`)
                // console.log(latestversion)
                if (latestversion.version == JSON.parse(currentversion).version) {
                    // console.log(`true`)
                    response = true;
                }
            })
        })
        // console.log(`false`)
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
        return NetInfo.fetch().then(async (state) => {
            // console.log("network: "+state.isConnected);
            if(state.isConnected){
                return true;
            }else{
                return false;
            }
        })
    }
    
    async downloadData(){
        await fetch('https://expoapp.bodypower.com/api/me', {
            method: 'GET',
            headers: {
                //Header Defination
                'Accept': 'application/json',
                'Content-Type':'application/json',
                'access_token':await AsyncStorage.getItem('token'),
                'token_type':'Bearer'
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            AsyncStorage.setItem('user', JSON.stringify(responseJson));
        })
        // console.log("user set")
        await fetch('https://expoapp.bodypower.com/api/zones', {
            method: 'GET',
            headers: {
                //Header Defination
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            AsyncStorage.setItem('zones', JSON.stringify(responseJson));
        })
        await fetch('https://expoapp.bodypower.com/api/map', {
            method: 'GET',
            headers: {
                //Header Defination
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            AsyncStorage.setItem('map', JSON.stringify(responseJson));
        })
        // console.log("data set")
        await fetch('https://expoapp.bodypower.com/api/events', {
            method: 'GET',
            headers: {
                //Header Defination
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            AsyncStorage.setItem('events', JSON.stringify(responseJson));
        })
        await fetch('https://expoapp.bodypower.com/api/feeds', {
            method: 'GET',
            headers: {
                //Header Defination
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            AsyncStorage.setItem('feeds', JSON.stringify(responseJson));
        })
        await fetch('https://expoapp.bodypower.com/api/guests', {
            method: 'GET',
            headers: {
                //Header Defination
                'Accept': 'application/json',
                'Content-Type':'application/json'
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
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
        }).then(async (serverversion) => {
            await serverversion.json().then(async (latestversion) => {
                // console.log("Setting new server version");
                AsyncStorage.setItem('currentversion', JSON.stringify(latestversion));
            })
        })
        
        
    }
    
    async getData(dataname){
        if(await this.versionNotNull() == true){
            const data = await AsyncStorage.getItem(dataname)
            return JSON.parse(data);
        }else{
            // console.log('3')
            await this.downloadData();
            const data = await AsyncStorage.getItem(dataname)
            return JSON.parse(data);
        }
    }

}