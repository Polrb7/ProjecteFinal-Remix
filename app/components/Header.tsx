type HeaderProps = {
  onOpenForm: (formType: "login" | "register") => void;
};

export default function Header({ onOpenForm }: HeaderProps) {
  return (
    <header className="flex justify-end p-4">
      <button
        className="mr-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={() => onOpenForm("login")}
      >
        Login
      </button>
      <button
        className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        onClick={() => onOpenForm("register")}
      >
        Register
      </button>
    </header>
  );
}
