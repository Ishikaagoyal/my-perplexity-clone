import { NextResponse } from "next/server";
import axios from "axios";
export async function POST(req){
    const {searchInput , searchType}= await req.json();
    if(searchInput){
        const result= await axios.get('https://api.search.brave.com/res/v1/web/search?q='+searchInput + '&count=5',{
        headers:{
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip',
            'X-Subscription-Token': process.env.BRAVE_API_KEY
            



        }
    })
    //console.log(result.data);
    return NextResponse.json(result.data);

    }
    else{
        return NextResponse.json({error:'please pass user search query'})

    }
    
}