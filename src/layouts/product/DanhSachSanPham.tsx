import React, { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import {layToanBoSach, timKiemSach} from "../../api/SachAPI";
import {PhanTrang} from "../utils/PhanTrang";
import BookProps from "./components/SachProps";
import SachProps from "./components/SachProps";

interface DanhSachSanPhamProps {
    tuKhoaTimKiem: string;
    idGenre: number;
}


function DanhSachSanPham({ tuKhoaTimKiem, idGenre }: DanhSachSanPhamProps) {

    const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<BookModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);
    const [trangHienTai, setTrangHienTai] = useState(1);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [tongSoSach, setSoSach] = useState(0);

    useEffect(() => {
        if (tuKhoaTimKiem === '' && idGenre==0) {
            layToanBoSach(trangHienTai - 1).then(
                kq => {
                    setDanhSachQuyenSach(kq.ketQua);
                    setTongSoTrang(kq.tongSoTrang);
                    setDangTaiDuLieu(false);
                }
            ).catch(
                error => {
                    setDangTaiDuLieu(false);
                    setBaoLoi(error.message);
                }
            );
        }else{
            timKiemSach(tuKhoaTimKiem, idGenre).then(
                kq => {
                    setDanhSachQuyenSach(kq.ketQua);
                    setTongSoTrang(kq.tongSoTrang);
                    setDangTaiDuLieu(false);
                }
            ).catch(
                error => {
                    setDangTaiDuLieu(false);
                    setBaoLoi(error.message);
                }
            );
        }
    }, [trangHienTai, tuKhoaTimKiem, idGenre]);

    const phanTrang = (trang: number) => {
        setTrangHienTai(trang);
    };

    //console.log(trangHienTai);

    if (dangTaiDuLieu) {
        return (
            <div>
                <h1>Đang tải dữ liệu</h1>
            </div>
        );
    }

    if (baoLoi) {
        return (
            <div>
                <h1>Gặp lỗi: {baoLoi}</h1>
            </div>
        );
    }


    if(danhSachQuyenSach.length===0){
        return (
            <div className="container">
                <div className="d-flex align-items-center justify-content-center">
                    <h1>Hiện không tìm thấy sách theo yêu cầu!</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="container">

            <div className="row mt-4 mb-4">
                {
                    danhSachQuyenSach.map((sach) => (
                            <SachProps key={sach.idBook} sach={sach} />
                        )
                    )
                }
            </div>
            <PhanTrang trangHienTai={trangHienTai} tongSoTrang={tongSoTrang} phanTrang={phanTrang} />
        </div>
    );
}

export default DanhSachSanPham;