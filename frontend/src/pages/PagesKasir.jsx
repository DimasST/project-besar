import DashboardKasir from "../components/DashboardKasir";
import { Row } from 'react-bootstrap'; // Pastikan Anda mengimpor Row
import NavbarComponent from "../components/NavbarComponent.jsx";
const PagesHome = () => {
  return (
    <>
    <div>
        <NavbarComponent />
            <div className="container-fluid mt-3">
                <Row>
                    <DashboardKasir />
                </Row>
            </div>
    </div>
    </>
  )
}

export default PagesHome