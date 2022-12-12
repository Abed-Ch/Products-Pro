export default async function FetchFunction(fetchMethod, fetchdata = null) {
    var returnData;
    var FetchData = "";
    switch (fetchMethod) {
        case "GET":
            FetchData = await fetch('http://localhost:8000/Main.php');
            if (FetchData.status === 420) {
                return 420;
            }
            returnData = await FetchData.json();
            return returnData;
        case "POST":
            FetchData = await fetch('http://localhost:8000/Main.php', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fetchdata)
            });
            
            let arr = [FetchData,FetchData.status];
            return arr ;
        default :
        break; 
    }
}