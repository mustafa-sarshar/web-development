import { Link } from "react-router-dom";

const Public = ()=>{
    return (
        <section className="public"> 
            <header>
                <h1>
                    Welcome to <span className="nowrap">FindFaces, a tool to find those you may think, live, act or believe like you.</span>
                </h1>
            </header>
            <main className="public__main">
                <p>
                    Have Fun and Enjoy it!
                </p>
            </main>
            <footer>
                <Link to="/login">Login In Page</Link>
            </footer>
        </section>
    )
}
export default Public;