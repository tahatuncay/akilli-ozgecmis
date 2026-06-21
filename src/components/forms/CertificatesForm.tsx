"use client";

import { useCV } from "@/context/CVContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Certificate } from "@/types/cv";

export function CertificatesForm() {
  const { cvData, dispatch } = useCV();
  const { certificates } = cvData;

  const handleAddCertificate = () => {
    const newCertificate: Certificate = {
      id: crypto.randomUUID(),
      name: "",
      issuer: "",
      date: "",
      url: "",
    };
    dispatch({ type: "ADD_CERTIFICATE", payload: newCertificate });
  };

  const handleUpdateCertificate = (id: string, field: keyof Certificate, value: any) => {
    const certificateToUpdate = certificates.find((cert) => cert.id === id);
    if (certificateToUpdate) {
      dispatch({
        type: "UPDATE_CERTIFICATE",
        payload: { ...certificateToUpdate, [field]: value },
      });
    }
  };

  const handleRemoveCertificate = (id: string) => {
    dispatch({ type: "REMOVE_CERTIFICATE", payload: id });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Sertifikalar ve Başarılar</h2>
          <p className="text-sm text-[var(--foreground-muted)]">Sahip olduğunuz sertifikaları, ödülleri veya katıldığınız kursları ekleyin.</p>
        </div>
        <Button onClick={handleAddCertificate} variant="outline" size="sm" leftIcon={
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        }>
          Sertifika Ekle
        </Button>
      </div>

      {certificates.length === 0 ? (
        <Card variant="outlined" className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <svg className="h-12 w-12 text-[var(--foreground-muted)] mb-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
            <p className="text-[var(--foreground-muted)] mb-4">Henüz sertifika eklemediniz.</p>
            <Button onClick={handleAddCertificate} variant="primary">İlk Sertifikayı Ekle</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {certificates.map((cert, index) => (
            <Card key={cert.id} variant="default" className="relative group">
              <button
                type="button"
                onClick={() => handleRemoveCertificate(cert.id)}
                className="absolute top-4 right-4 p-2 text-[var(--foreground-muted)] hover:text-error hover:bg-error/10 rounded-lg transition-colors"
                aria-label="Sertifikayı Sil"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
              
              <CardHeader>
                <CardTitle>Sertifika {index + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Sertifika / Kurs Adı"
                  value={cert.name}
                  onChange={(e) => handleUpdateCertificate(cert.id, "name", e.target.value)}
                  placeholder="Örn: AWS Certified Developer"
                  required
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Veren Kurum"
                    value={cert.issuer}
                    onChange={(e) => handleUpdateCertificate(cert.id, "issuer", e.target.value)}
                    placeholder="Örn: Amazon Web Services"
                    required
                  />
                  <Input
                    label="Alınma Tarihi"
                    type="month"
                    value={cert.date}
                    onChange={(e) => handleUpdateCertificate(cert.id, "date", e.target.value)}
                    required
                  />
                </div>

                <Input
                  label="Sertifika Linki (Opsiyonel)"
                  type="url"
                  value={cert.url || ""}
                  onChange={(e) => handleUpdateCertificate(cert.id, "url", e.target.value)}
                  placeholder="https://..."
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
