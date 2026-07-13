const handleSaveOnboarding = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
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

      // Aggiorna lo stato locale
      setSettings(prev => ({
        ...prev,
        id: user.id,
        weight: numericWeight,
        height: numericHeight
      }));
      setNeedsOnboarding(false);
    } catch (err) {
      console.error("Errore salvataggio onboarding:", err);
      // Questo alert ci dirà esattamente perché il database rifiuta i dati
      alert(
        "Errore dettagliato:\n" + 
        (err.message || JSON.stringify(err)) + 
        "\n\nCodice errore: " + (err.code || "Nessuno")
      );
    } finally {
      setOnboardSaving(false);
    }
  };