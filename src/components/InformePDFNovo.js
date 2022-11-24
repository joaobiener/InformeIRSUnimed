import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { useLocation } from "react-router-dom";



// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#fdfdfd'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

// Create Document Component
const InformePDFNovo = () => {


    const location = useLocation();


    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Last name:</Text>
                    <Text children={location.state.data[0].documentoBenefiario} />
                </View>
                <View style={styles.section}>
                    <Text>Ano de Referência: {location.state.data[0].anoReferencia}</Text>
                </View>
            </Page>
        </Document>
    );
}
export default InformePDFNovo;