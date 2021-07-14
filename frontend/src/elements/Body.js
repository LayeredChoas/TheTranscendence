// import "../../pages/Main.css"
import Footer from "./Footer";

import styles from "./../css_files/main.module.css";
import { userContext } from "../context/AuthProvider";
import { useContext, useEffect } from "react";
import Router from "next/router";

function Body() {
  const { user } = useContext(userContext);
  useEffect(() => {
    if (!user.isLoading && (user.isLoggedIn || user.auth))
      Router.push("/member");
  }, [user.isLoading]);

  return (
    <div>
      {!user.isLoading && !user.isLoggedIn && !user.auth ? (
        <div>
          <main
            className={
              "container-fluid px-3 " + styles.showcase + " " + styles.banner
            }
          >
            <div className="container">
              <h1>ft_transcendence.</h1>
              <p className="lead">
                {" "}
                In this subject you will need to build a website for the mighty
                pong contest. Your website will help user run pong tournament
                and play against each other. There will be an admin view, chat
                with moderators, real time multiplayer online games. There will
                be guilds and wars!
              </p>
              <p className="lead">
                <a
                  href="#main-header"
                  className="btn btn-lg text-white btn-secondary fw-bold border-danger bg-danger"
                >
                  About_Project
                </a>
              </p>
            </div>
          </main>

          <div>
            <header id="main-header">
              <div className={styles.contwrap}>
                <h1>
                  <i className="fas fa-brain"></i> About Project
                </h1>
                <h3>
                  <i className="fas fa-user"></i> M,A / Ayoub
                </h3>
              </div>
            </header>
            <div className="container py-5">
              <div className="row">
                <div className="col-md-12">
                  <div className={styles.maintimeline}>
                    <div className={styles.timeline}>
                      <a href="#" className={styles.timelinecontent}>
                        <div className={styles.timelineicon}>
                          <i className="fa fa-globe"></i>
                        </div>
                        <h3 className="title">Web Designing</h3>
                        <p className="description">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Integer males uada tellus lorem, et condimentum
                          neque commodo Integer males uada tellus lorem, et
                          condimentum neque commodo
                        </p>
                      </a>
                    </div>
                    <div className={styles.timeline}>
                      <a href="#" className={styles.timelinecontent}>
                        <div className={styles.timelineicon}>
                          <i className="fa fa-rocket"></i>
                        </div>
                        <h3 className="title">Web Development</h3>
                        <p className="description">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Integer males uada tellus lorem, et condimentum
                          neque commodo Integer males uada tellus lorem, et
                          condimentum neque commodo
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      ) : null}
    </div>
  );
}

export default Body;
