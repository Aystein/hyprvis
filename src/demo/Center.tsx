export function Center({ children }: { children: React.ReactNode }) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 16 }}>
        {children}
    </div>
}