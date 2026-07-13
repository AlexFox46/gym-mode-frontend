const handleSaveOnboarding = async (e) => {
    e.preventDefault();
    if (!user) return;
    setOnboardSaving(true);

    const numericWeight = parseFloat(onboardWeight);
    const numericHeight = parseFloat(onboardHeight);

    if (isNaN(numericWeight) || isNaN(numericHeight) || numericWeight <= 0 || numericHeight <= 0) {
      alert("Inserisci valori biometrici validi.");
      setOnboardSaving(false);
      return;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .insert([{
          id: user.id,
          weight: numericWeight,
          height: numericHeight
        }]);

      if (error) throw error;

      // Aggiorna lo stato globale ed esce dall'onboarding
      setSettings(prev => ({
        ...prev,
        id: user.id,
        weight: numericWeight,
        height: numericHeight
      }));
      setNeedsOnboarding(false);
    } catch (err) {
      console.error("Errore salvataggio onboarding:", err);
      // MOSTRAMO L'ERRORE REALE DETTAGLIATO
      alert(
        "Errore dettagliato:\n" + 
        (err.message || JSON.stringify(err)) + 
        "\n\nCodice errore: " + (err.code || "Nessuno")
      );
    } finally {
      setOnboardSaving(false);
    }
  };