import "bootstrap/dist/css/bootstrap.min.css";

function HomePage({ data }) {
    return (
        <div>
            Bem vindo ao gerenciador de conteúdos!
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Título</th>
                        <th scope="col">Versões</th>
                        <th scope="col">Data de criação</th>
                        <th scope="col">Data de modificação</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(element => {
                        return (<tr>
                            <th scope="row">{ element.id }</th>
                            <td>{ typeof element.title === "string" ? element.title : "" }</td>
                            <td>{ Array.isArray(element.content) ? element.content.length : "0" }</td>
                            <td>{
                                typeof element.createdAt === "string"
                                    ? (() => {
                                        let date = new Date(element.createdAt);
                                        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
                                    })()
                                    : ""
                            }</td>
                            <td>{
                                typeof element.updatedAt === "string"
                                    ? (() => {
                                        let date = new Date(element.updatedAt);
                                        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
                                    })()
                                    : ""
                            }</td>
                            <td>{ element.status ? "Publicado" : "Despublicado" }</td>
                        </tr>); 
                    })}
                </tbody>
                </table>
        </div>
    );
}

export async function getServerSideProps() {
    const url = new URL('/list', process.env.HOST);
    const res = await fetch(url);
    const data = await res.json();

    return { props: { data } };
}

export default HomePage;