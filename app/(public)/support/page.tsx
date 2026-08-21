"use client";

import {
    ArrowLeft,
    Home,
    Phone,
    Mail,
    Building2,
    Headphones,
    ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ContactPage() {
    const router = useRouter();

    const openPhone = () => {
        window.location.href = "tel:+919696317202";
    };

    const openEmail = () => {
        window.location.href = "mailto:support@labourbaba.in";
    };

    const openLinkedIn = () => {
        window.open(
            "https://www.linkedin.com/",
            "_blank",
            "noopener,noreferrer"
        );
    };

    const openInstagram = () => {
        window.open(
            "https://www.instagram.com/labourbaba.in/",
            "_blank",
            "noopener,noreferrer"
        );
    };

    return (
        <main style={styles.page}>
            {/* ================= HEADER ================= */}
            <header style={styles.header}>
                <button
                    onClick={() => router.back()}
                    style={styles.headerButton}
                    aria-label="Go back"
                >
                    <ArrowLeft size={23} strokeWidth={2} />
                </button>

                <h1 style={styles.headerTitle}>Contact Us</h1>

                <button
                    onClick={() => router.push("/")}
                    style={styles.headerButton}
                    aria-label="Go home"
                >
                    <Home size={21} strokeWidth={2} />
                </button>
            </header>

            {/* ================= CONTENT ================= */}
            <section style={styles.content}>
                {/* Intro */}
                <div style={styles.intro}>
                    <h2 style={styles.heading}>Get in Touch</h2>

                    <p style={styles.description}>
                        We're here to help. Reach out to LabourBaba anytime.
                    </p>
                </div>

                {/* ================= CONTACT CARDS ================= */}
                <div style={styles.contactList}>
                    {/* Call */}
                    <button
                        onClick={openPhone}
                        style={styles.contactCard}
                    >
                        <div style={styles.iconWrapper}>
                            <Phone size={21} strokeWidth={2} />
                        </div>

                        <div style={styles.cardContent}>
                            <span style={styles.cardLabel}>Call Us</span>

                            <span style={styles.cardValue}>
                                +91 96963 17202
                            </span>
                        </div>
                    </button>

                    {/* Email */}
                    <button
                        onClick={openEmail}
                        style={styles.contactCard}
                    >
                        <div style={styles.iconWrapper}>
                            <Mail size={21} strokeWidth={2} />
                        </div>

                        <div style={styles.cardContent}>
                            <span style={styles.cardLabel}>Email Us</span>

                            <span style={styles.cardValue}>
                                support@labourbaba.in
                            </span>
                        </div>
                    </button>

                    {/* LinkedIn */}
                    <button
                        onClick={openLinkedIn}
                        style={styles.contactCard}
                    >
                        <div style={styles.iconWrapper}>
                            <Building2 size={21} strokeWidth={2} />
                        </div>

                        <div style={styles.cardContent}>
                            <span style={styles.cardLabel}>LinkedIn</span>

                            <span style={styles.socialText}>
                                Connect with us on LinkedIn
                            </span>
                        </div>

                        <ChevronRight
                            size={22}
                            style={styles.chevron}
                        />
                    </button>

                    {/* Instagram */}
                    <button
                        onClick={openInstagram}
                        style={styles.contactCard}
                    >
                        <div style={styles.iconWrapper}>
                            <div
                                style={{
                                    fontSize: "21px",
                                    fontWeight: 700,
                                    lineHeight: 1,
                                }}
                            >
                                ◎
                            </div>
                        </div>

                        <div style={styles.cardContent}>
                            <span style={styles.cardLabel}>Instagram</span>

                            <span style={styles.socialText}>
                                Follow LabourBaba on Instagram
                            </span>
                        </div>

                        <ChevronRight
                            size={22}
                            style={styles.chevron}
                        />
                    </button>
                </div>

                {/* ================= SUPPORT CARD ================= */}
                <section style={styles.supportCard}>
                    <div style={styles.supportIcon}>
                        <Headphones size={28} strokeWidth={2} />
                    </div>

                    <h3 style={styles.supportTitle}>
                        Need help with LabourBaba?
                    </h3>

                    <p style={styles.supportDescription}>
                        Whether you need a worker or want to join
                        our growing network, our team is ready to
                        help.
                    </p>

                    <button
                        onClick={openEmail}
                        style={styles.supportButton}
                    >
                        Contact Support
                    </button>
                </section>
            </section>
        </main>
    );
}

/* =====================================================
   STYLES
===================================================== */

const styles: {
    [key: string]: React.CSSProperties;
} = {
    page: {
        minHeight: "100vh",
        background: "#F7F9F8",
        color: "#202423",
    },

    /* Header */
    header: {
        height: "72px",
        display: "grid",
        gridTemplateColumns: "48px 1fr 48px",
        alignItems: "center",
        padding: "0 18px",
        background: "#F8FAF9",
        borderBottom: "1px solid #E8ECEA",
        boxSizing: "border-box",
    },

    headerButton: {
        width: "40px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        background: "transparent",
        color: "#FF4F0A",
        cursor: "pointer",
        borderRadius: "50%",
        padding: 0,
    },

    headerTitle: {
        margin: 0,
        textAlign: "center",
        color: "#FF4F0A",
        fontSize: "24px",
        fontWeight: 700,
        lineHeight: 1,
    },

    /* Main content */
    content: {
        width: "100%",
        maxWidth: "430px",
        margin: "0 auto",
        padding: "25px 26px 40px",
        boxSizing: "border-box",
    },

    /* Intro */
    intro: {
        marginBottom: "32px",
    },

    heading: {
        margin: "0 0 8px",
        fontSize: "31px",
        lineHeight: 1.15,
        fontWeight: 750,
        letterSpacing: "-0.7px",
    },

    description: {
        margin: 0,
        color: "#4D5553",
        fontSize: "16px",
        lineHeight: 1.55,
    },

    /* Contact cards */
    contactList: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
    },

    contactCard: {
        width: "100%",
        minHeight: "91px",
        display: "flex",
        alignItems: "center",
        padding: "16px 20px",
        background: "#FFFFFF",
        border: "1px solid #DFE4E2",
        borderRadius: "7px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.035)",
        textAlign: "left",
        cursor: "pointer",
        boxSizing: "border-box",
    },

    iconWrapper: {
        width: "48px",
        height: "48px",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: "16px",
        borderRadius: "50%",
        background: "#FFF0E9",
        color: "#FF4F0A",
    },

    cardContent: {
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        gap: "5px",
    },

    cardLabel: {
        color: "#414846",
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: 1.2,
    },

    cardValue: {
        color: "#202423",
        fontSize: "17px",
        fontWeight: 650,
        lineHeight: 1.25,
        wordBreak: "break-word",
    },

    socialText: {
        color: "#252B29",
        fontSize: "14.5px",
        fontWeight: 400,
        lineHeight: 1.4,
        maxWidth: "210px",
    },

    chevron: {
        flexShrink: 0,
        marginLeft: "auto",
        color: "#B9C2BF",
    },

    /* Support */
    supportCard: {
        marginTop: "64px",
        padding: "23px 24px 24px",
        background: "#FFF0E8",
        borderRadius: "11px",
        textAlign: "center",
        boxSizing: "border-box",
    },

    supportIcon: {
        width: "64px",
        height: "64px",
        margin: "0 auto 17px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        background: "#FFFFFF",
        color: "#FF4F0A",
    },

    supportTitle: {
        margin: "0 0 16px",
        color: "#202423",
        fontSize: "21px",
        lineHeight: 1.25,
        fontWeight: 700,
    },

    supportDescription: {
        margin: "0 auto 25px",
        maxWidth: "290px",
        color: "#171B1A",
        fontSize: "14.5px",
        lineHeight: 1.45,
    },

    supportButton: {
        width: "100%",
        height: "56px",
        border: "none",
        borderRadius: "30px",
        background: "#FF4F0A",
        color: "#FFFFFF",
        fontSize: "16px",
        fontWeight: 700,
        cursor: "pointer",
    },
};