import { Outlet } from "react-router-dom"

function Sablon() {


    return (
        <>
            <header>
                <link to ="/">Ana Ekran</link>
                <link to ="/blog">Blog Ekranı</link>
                <link to ="/iletisim">İletişim Ekranı</link>
            </header>
            <section><Outlet /></section>
            <footer>Tüm hakları saklıdır.</footer>
        </>
    )
}


export default Sablon