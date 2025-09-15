import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'http://localhost:54321';
const supabaseKey = 'public-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

interface Reading {
    id: string;
    asset_id: string;
    session_id: string;
    value: number;
    recorded_at: string;
}

const App = () => {
    const [readings, setReadings] = useState<Reading[]>([]);

    useEffect(() => {
        // Initial fetch
        supabase.from<Reading>('readings').select('*').then(res => {
            if (res.data) setReadings(res.data);
        });

        // Subscribe to realtime updates
        const channel = supabase.channel('realtime')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'readings' }, (payload: any) => {
                setReadings(prev => [...prev, payload.new as Reading]);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <h1>Realtime Readings</h1>
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
                    {readings.map(r => (
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
        </div>
    );
};

export default App;
