function VisualizePage({ data }) {
    let content = data?.content?.sort((a, b) => {
        let firstDate = new Date(a.updatedAt),
            secondDate = new Date(b.updatedAt);
        
        if (firstDate < secondDate) {
            return -1;
        }

        if (firstDate > secondDate) {
            return 1;
        }

        return 0;
    });

    const html = content?.pop()?.body || "<div>Artigo sem conteúdo</div>";

    return (
        <div dangerouslySetInnerHTML={{ __html: html }} />
    );
}

export async function getServerSideProps(context) {
    const res = await fetch(`http://localhost:8080/get?id=${context.query.id}`);
    const data = await res.json();

    return {
        props: {
            data
        }
    };
}

export default VisualizePage;
