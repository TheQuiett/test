import React, { useEffect, useRef } from 'react';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator.min.css';

function TabulatorGrid() {
    // useRef로 Tabulator 인스턴스와 DOM 요소 참조 생성
    const tableRef = useRef(null);
    const tabulatorRef = useRef(null);

    const tableData = [
        { id: 1, name: "홍길동", age: 25, city: "서울" },
        { id: 2, name: "김철수", age: 30, city: "부산" },
        { id: 3, name: "이영희", age: 28, city: "대구" },
    ];

    const columns = [
        { title: "ID", field: "id" },
        { title: "이름", field: "name" },
        { title: "나이", field: "age" },
        { title: "도시", field: "city" },
    ];

    useEffect(() => {
        // 컴포넌트가 마운트된 후에만 Tabulator 인스턴스 생성
        if (tableRef.current) {
            // 기존 테이블 제거
            if (tabulatorRef.current) {
                tabulatorRef.current.destroy();
            }

            // 새 테이블 생성
            tabulatorRef.current = new Tabulator(tableRef.current, {
                data: tableData,
                columns: columns,
                layout: "fitColumns",
                responsiveLayout: "hide",
                height: 400,
            });

            // 명시적으로 rowClick 이벤트 등록
            tabulatorRef.current.on("rowClick", (e, row) => {
                console.log("행 클릭됨:", row.getData());
                alert(`${row.getData().name}님의 행이 선택되었습니다.`);
            });
        }

        // 컴포넌트 언마운트 시 정리
        return () => {
            if (tabulatorRef.current) {
                tabulatorRef.current.destroy();
            }
        };
    }, []); // 빈 의존성 배열로 컴포넌트 마운트 시에만 실행

    return (
        <div>
            <h2>Tabulator 그리드 예제</h2>
            <div ref={tableRef}></div>
        </div>
    );
}

export default TabulatorGrid;