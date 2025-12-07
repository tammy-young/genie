
export default function FormError({ message, className = "" }) {
  return (
    <p style={{ margin: 0, padding: 0 }} className={`text-danger ${className}`}>{message}</p>
  );
}
