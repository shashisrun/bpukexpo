if(networkState.isConnected){
    const serverversion = await fetch('https://expoapp.bodypower.com/api/version', {
      method: 'GET',
      headers: {
        //Header Defination
        'Content-Type':
        'application/json',
      },
    })
    
    const token = await AsyncStorage.getItem('token');
    const currentversion = await AsyncStorage.getItem('version');
    console.log('currentversion')
    console.log(currentversion)
    console.log('serverversion')
    console.log(serverversion)
    if(currentversion != null && currentversion == JSON.stringify(serverversion)){
      console.log("Inside IF")
      AsyncStorage.getItem('token').then((value) =>
        navigation.replace(
          value === null ? 'Auth' : 'Root'
        ),
      );
      }else{
        console.log("Inside else")
        AsyncStorage.setItem('currentversion', JSON.stringify(serverversion));
        fetch('https://expoapp.bodypower.com/public/api/zones', {
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
          responseJson.map(async d => {
            const rawdata = await fetch('https://expoapp.bodypower.com/public/api/zones/'+ d.id, { 
              method: 'GET',
              headers: {
                //Header Defination
                'Content-Type':
                'application/json',
                'Authorization':
                'Bearer ' + token,
              },
            });
            const json = await rawdata.json();
            AsyncStorage.setItem('zones_'+d.id, JSON.stringify(json));
          })
        })
        fetch('https://expoapp.bodypower.com/public/api/map', {
          method: 'GET',
          headers: {
            //Header Defination
            'Content-Type':
            'application/json',
          },
        })
        .then((response) => response.json())
        .then((responseJson) => {
          AsyncStorage.setItem('map', JSON.stringify(responseJson.map));
        })
        fetch('https://expoapp.bodypower.com/public/api/events', {
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
          responseJson.map(async (d) => {
            const rawdata = await fetch('https://expoapp.bodypower.com/public/api/events/'+ d.id, { 
              method: 'GET',
              headers: {
                //Header Defination
                'Content-Type':
                'application/json',
                'Authorization':
                'Bearer ' + token,
              },
            });
            const json = await rawdata.json();
            AsyncStorage.setItem('events_'+d.id, JSON.stringify(json));
          })
        })
        fetch('https://expoapp.bodypower.com/public/api/guests', {
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
          responseJson.map(async d => {
            const rawdata = await fetch('https://expoapp.bodypower.com/public/api/guests/'+ d.id, { 
              method: 'GET',
              headers: {
                //Header Defination
                'Content-Type':
                'application/json',
                'Authorization':
                'Bearer ' + token,
              },
            });
            const json = await rawdata.json();
            AsyncStorage.setItem('guests_'+d.id, JSON.stringify(json));
          })
        })
      }
      
      console.log("Inside if 2")
    }else{
      console.log("Inside else 2")
    AsyncStorage.getItem('token').then((value) =>
      navigation.replace(
        value === null ? 'Auth' : 'Root'
      ),
    );
  }