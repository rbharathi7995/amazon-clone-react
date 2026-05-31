import {Header} from '../components/Header'
import './Page404.css'

export function Page404(){
    return(
       <>
       <title>404 Page Not Found</title>
       <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
         <Header/>
        
         <div className="not-found-message">Data Not Found</div>
       </> 
    )
}