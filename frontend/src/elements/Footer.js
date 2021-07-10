// import '../../pages/Main.css'
import styles from './../css_files/main.module.css'


function Footer() {
  return (
    <div>
      <footer className={styles.footer +  " bg-dark"}>
        <div className="social">
          <a  href="http://facebook.com">
            <i className="fb fab fa-facebook fa-2x"></i>
          </a>
          <a href="http://twitter.com">
            <i className="tw fab fa-twitter fa-2x"></i>
          </a>
          <a href="http://youtube.com">
            <i className="yt fab fa-youtube fa-2x"></i>
          </a>
          <a href="http://linkedin.com">
            <i className="li fab fa-linkedin fa-2x"></i>
          </a>
        </div>
        <p>Copyright &copy; 2021 - Ayoub</p>
      </footer>
    </div>
  );
}

export default Footer;
