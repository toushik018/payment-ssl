import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        padding: 20,
    },
    header: {
        textAlign: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    section: {
        marginTop: 10,
        borderBottom: '1 solid #ccc',
        paddingBottom: 10,
    },
    label: {
        fontWeight: 'bold',
    },
    value: {
        marginLeft: 8,
    },
    downloadButton: {
        display: 'block',
        width: '100%',
        padding: 10,
        backgroundColor: '#ccc',
        borderRadius: 8,
        textAlign: 'center',
        textDecoration: 'none',
        marginTop: 20,
    },
});

const InvoiceDocument = ({ courseName, instructor, price, date, mobile }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.title}>Invoice</Text>
                <Text>{date}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Course:</Text>
                <Text style={styles.value}>{courseName}</Text>
                <Text style={styles.label}>Instructor:</Text>
                <Text style={styles.value}>{instructor}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.title}>Total Amount</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>${price}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Contact Information</Text>
                <Text style={styles.value}>Mobile: {mobile}</Text>
            </View>
        </Page>
    </Document>
);

const Invoice = ({ courseName, instructor, price, date, mobile }) => {
    return (
        <div className="bg-gray-200  p-2 rounded-lg">
        <div className='flex justify-start'>
            <PDFDownloadLink
                document={<InvoiceDocument {...{ courseName, instructor, price, date, mobile }} />}
                fileName="invoice.pdf"
            >
                {({ url }) => (
                    <a href={url} className={`${styles.downloadButton} hover:${styles.downloadButtonHover}`}>
                        Download Invoice
                    </a>
                )}
            </PDFDownloadLink>
        </div>
    </div>
    );
};

export default Invoice;
