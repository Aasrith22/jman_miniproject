export default function SearchBar({search,setSearch}:any){
    return(
    <div style={{display:"flex",justifyContent:"flex-end",marginTop:"10px"}}>
        <input
        placeholder="Search courses"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        />
        </div>
        )
    }