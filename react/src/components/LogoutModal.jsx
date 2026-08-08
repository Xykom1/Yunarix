function LogoutModal({ onCancel, onConfirm }) {
    return (
        <div className="modal">
            <div className="modal-content">

                <p>Voulez-vous vraiment vous déconnecter ?</p>

                <div className="modal-buttons">

                    <button id="confirm-logout" onClick={onConfirm}>
                        Oui
                    </button>

                    <button id="cancel-logout" onClick={onCancel}>
                        Annuler
                    </button>

                </div>

            </div>
        </div>
    );
}

export default LogoutModal;