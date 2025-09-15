import React, { useEffect, useState } from 'react';
import { createClient, SupabaseClient, RealtimeChannel } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

interface Reading {
    id: string;
    asset_id: string;
    session_id: string;
    value: number;
    recorded_at: string;
}

const App: React.FC = () => {
    const [readings, setReadings] = useState<Reading[]>([]);

    useEffect(() => {
        const fetchReadings = async () => {
            const { data, error } = await supabase.from('temp').select('*');
            if (error) console.error('Error fetching readings:', error);
            else setReadings(data as Reading[] || []);
        };
        fetchReadings();

        const channel: RealtimeChannel = supabase.channel('realtime')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'readings' },
                (payload: any) => setReadings(prev => [...prev, payload.new as Reading])
            )
            .subscribe();

        const interval = setInterval(async () => {
            if (readings.length === 0) return;
            const randomReading = {
                session_id: readings[0].session_id,
                asset_id: readings[0].asset_id,
                value: Math.random() * 100,
                recorded_at: new Date().toISOString(),
            };
            await supabase.from('readings').insert([randomReading]);
        }, 5000);

        return () => {
            supabase.removeChannel(channel);
            clearInterval(interval);
        };
    }, [readings]);

    return (
        <div style={{ padding: 20 }}>
            <h1>Realtime Readings Demo</h1>
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
