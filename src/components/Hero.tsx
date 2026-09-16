import './Hero.css'
import ProfileCard from './ProfileCard';
import { TbWorld } from "react-icons/tb";

export default function Hero() {
    return (
        <section className="hero-section" id="hero">
            <div className="hero-top-dark">
                <nav className="hero-nav">
                    <div className="nav-brand">
                        <div className="brand-icon"></div>
                        <div className="brand-text">
                            <span className="brand-name">Sachith</span>
                            <span className="brand-name">Dhanushka</span>
                        </div>
                    </div>
                    <ul className="nav-links">
                        <li><a href="#work">Work</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#blog">Blog</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>

                <div className="hero-header-container">
                    <h1 className="hero-title-massive">
                        <span className="mask mask-software"><span className="mask-inner">
                            <span className="char">S</span>
                            <span className="char">A</span>
                            <span className="char">c</span>
                            <span className="char">H</span>
                            <span className="char">I</span>
                            <span className="char">T</span>
                            <span className="char">H</span>
                            {/* <span className="char">E</span> */}
                        </span></span>{' '}

                        <span className="mask mask-engineer"><span className="mask-inner">
                            <span className="char">D</span>
                            <span className="char">H</span>
                            <span className="char">A</span>
                            <span className="char">N</span>
                            <span className="char">U</span>
                            <span className="char">S</span>
                            <span className="char">H</span>
                            <span className="char">K</span>
                            <span className="char">A</span>
                        </span></span>
                    </h1>
                </div>

                <div className="hero-intro-row">
                    <div className="intro-col">
                        <p>I'm currently an Associate Software Engineer at TheWeb Agency, designing and delivering scalable software solutions for global clients with cutting-edge technologies like React.js, PHP, and cloud platforms.</p>
                    </div>
                    <div className="intro-col">
                        <p>I'm a passionate developer with hands-on experience in modern development practices, frameworks, and cloud computing. I love solving complex problems and delivering high-quality software solutions.</p>
                    </div>
                    <div className="intro-col intro-cta">
                        <a href="#contact" className="get-in-touch">GET IN TOUCH &rarr;</a>
                    </div>
                </div>

                <div className="hero-bottom-light">
                    <div className="grid-overlay"></div>
                    <div className="profile-wrapper">
                        <ProfileCard />
                    </div>

                    {/* Floating Badges */}
                    <div className="badge-exact badge-teal">
                        <div className="badge-teal-top">
                            <span className="badge-icon-diamond">◆</span>
                            <span className="badge-icon-diamond">◆</span>
                        </div>
                        <strong className="badge-title big-title">FULL STACK</strong>
                        <span className="badge-sub">DEVELOPMENT</span>
                    </div>

                    <div className="badge-exact badge-yellow">
                        <span className="badge-icon-pc">💻</span>
                        <strong className="badge-title">REST APIS &</strong>
                        <strong className="badge-title">ARCHITECTURE</strong>
                    </div>

                    <div className="badge-exact badge-orange">
                        <strong className="badge-title">CLOUD &</strong>
                        <strong className="badge-title">CI/CD</strong>
                        <span className="badge-arrow">↘</span>
                    </div>

                    <div className="badge-exact badge-pink">
                        <strong className="badge-title">DATABASE</strong>
                        <strong className="badge-title">DESIGN</strong>
                    </div>

                    <div className="badge-exact badge-aqua">
                        <strong className="badge-title">SECURITY &</strong>
                        <strong className="badge-title">AUTH</strong>
                        <span className="badge-icon-star">★</span>
                    </div>
                    <div className="badge-exact badge-circle">
                        <svg viewBox="0 0 200 200" className="badge-svg">
                            <circle cx="100" cy="100" r="95" className="badge-bg" />

                            <defs>
                                <path id="circlePath"
                                    d="M100,100
                                m-75,0
                                a75,75 0 1,1 150,0
                                a75,75 0 1,1 -150,0"/>
                            </defs>

                            <text className="badge-text">
                                <textPath href="#circlePath">
                                    • REAL-TIME COMMUNICATION • REAL-TIME •
                                </textPath>
                            </text>
                        </svg>
                        <div className='icon-circle'>
                            <TbWorld className='icon-symbol'/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
