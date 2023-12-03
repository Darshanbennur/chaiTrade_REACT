import React from 'react';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';

import styles from "../components/ui_footer.module.css"

export default function Footer() {
    return (
        <footer className={styles['footer-distributed']}>
            <div className={styles['footer-right']}>
                <a href="#"><EmailIcon /></a>
                <a href="#"><LinkedInIcon /></a>
                <a href="#"><GitHubIcon /></a>
                <a href="#"><InstagramIcon /></a>
            </div>
            <div className={styles['footer-left']}>
                <p className={styles['footer-links']}>
                    <a className={styles.footer_route} href="/faq">FAQ</a>
                    <a className={styles.footer_route} href="/pricing">Pricing</a>
                    <a className={styles.footer_route} href="/aboutUs">About Us</a>
                    <a className={styles.footer_route} href="/contactUs">Contact Us</a>
                </p>
                <p>Chai Trade &copy; 2023</p>
            </div>
        </footer>
    );
}