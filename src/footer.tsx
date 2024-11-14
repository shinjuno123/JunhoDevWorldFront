export default function Footer() {
    return (
        <>
            <footer className="footer">
                <div className="container footer__inner">
                    <p className="footer__item">
                        <strong>© 2023-2024</strong>
                        <br/>
                        <a href="/">Junho Shin</a>
                    </p>

                    <p className="footer__item">
                        <strong>Work</strong>
                        <br/>
                        <a href="https://www.bobsweep.com/"  rel="me">bObsweep</a>
                    </p>

                    <p className="footer__item">
                        <strong>Social</strong>
                        <br/>
                        <a href="https://github.com/shinjuno123"  rel="me">Github</a>
                        <a href="https://www.linkedin.com/in/junho-shin-18b883234"  rel="me">LinkedIn</a>
                    </p>


                    {/* <p className="footer__item">
                        <strong>Legal</strong>
                        <br/>
                        <a href="/"  rel="me">Privacy Policy</a>
                    </p> */}
    
                </div>
            </footer>
        </>
    );
}