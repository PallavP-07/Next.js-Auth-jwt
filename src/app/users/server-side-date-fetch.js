import Link from "next/link";


 export const  fetchUser =async()=>{
  try {
    let response = await fetch('https://dummyjson.com/users');
    let result = await response.json();
   
   return result.users;
  }catch(error){
    console.log(error);
    return [];
  }
}

export default async function userDatafetch () {
    let data = await fetchUser();
    return (
        <div>
             {data?.map((name) => {
                return (
                    <Link href={`/users/${name.id}`} key={name.id} className="flex flex-col p-2">{name.firstName}</Link>
                )
            })}
        </div>
    )
}