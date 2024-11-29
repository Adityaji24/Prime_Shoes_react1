import LoaderComp from "./Loader";
import { useState } from "react";

const PaymentDone = () => {
    const [isLoader, setIsLoader] = useState(true);

    setTimeout(() => {
        setIsLoader(false);
    }, 2000);

    const styles = {
        pageContainer: {
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(120deg, #f0f9ff, #e0f7fa, #e8f5e9)",
        },
        loaderContainer: {
            width: "100px",
            margin: "auto",
            textAlign: "center",
        },
        successMessage: {
            textAlign: "center",
            color: "#2e7d32",
            fontSize: "24px",
            fontWeight: "bold",
            padding: "30px",
            border: "2px solid #4caf50",
            borderRadius: "15px",
            background: "#ffffff",
            backgroundImage: "linear-gradient(to bottom, #ffffff, #f1f8e9)",
            boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
        },
        smallText: {
            fontSize: "18px",
            color: "#388e3c",
            fontWeight: "normal",
        },
    };

    return (
        <div style={styles.pageContainer}>
            {isLoader ? (
                <div style={styles.loaderContainer}>
                    <LoaderComp />
                </div>
            ) : (
                <h2 style={styles.successMessage}>
                    Your Order Has Been Successfully Placed! <br />
                    <small style={styles.smallText}>
                        We will deliver your products within 6 to 7 working days.
                    </small>
                </h2>
            )}
        </div>
    );
};

export default PaymentDone;
