import React from 'react';
import type { Reading } from '../types/db';

interface Props {
    readings: Reading[];
}

const ReadingTable: React.FC<Props> = ({ readings }) => {
    return (
        <table border={1} cellPadding={5}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Asset ID</th>
                    <th>Session ID</th>
                    <th>Value</th>
                    <th>Timestamp</th>
                </tr>
            </thead>
            <tbody>
                {readings.map((r) => (
                    <tr key={r.id}>
                        <td>{r.id}</td>
                        <td>{r.asset_id}</td>
                        <td>{r.session_id}</td>
                        <td>{r.value.toFixed(2)}</td>
                        <td>{new Date(r.recorded_at).toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ReadingTable;
