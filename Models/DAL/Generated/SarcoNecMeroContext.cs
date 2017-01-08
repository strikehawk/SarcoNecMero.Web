using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using SarcoNecMero.Web.Models.DAL.Sarcos;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class SarcoNecMeroContext : DbContext
    {
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Auteur>(entity =>
            {
                entity.HasKey(e => new { e.PersonneId, e.DocumentId })
                    .HasName("PK_Auteur");

                entity.ToTable("Auteur", "Doc");

                entity.HasIndex(e => new { e.DocumentId, e.Rang })
                    .HasName("IX_Auteur_Rang")
                    .IsUnique();

                entity.Property(e => e.Created)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Modified)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.ModifiedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Rang).HasDefaultValueSql("1");

                entity.HasOne(d => d.Document)
                    .WithMany(p => p.Auteurs)
                    .HasForeignKey(d => d.DocumentId)
                    .HasConstraintName("FK_Auteur_Document");

                entity.HasOne(d => d.Personne)
                    .WithMany(p => p.Auteur)
                    .HasForeignKey(d => d.PersonneId)
                    .HasConstraintName("FK_Auteur_Personne");
            });

            modelBuilder.Entity<AuteurPlan>(entity =>
            {
                entity.HasKey(e => new { e.PlanId, e.PersonneId })
                    .HasName("PK_AuteurPlan");

                entity.ToTable("AuteurPlan", "Ops");

                entity.HasIndex(e => new { e.PlanId, e.Rang })
                    .HasName("IX_AuteurPlan_Rang")
                    .IsUnique();

                entity.Property(e => e.Created)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Modified)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.ModifiedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.HasOne(d => d.Personne)
                    .WithMany(p => p.AuteurPlan)
                    .HasForeignKey(d => d.PersonneId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_AuteurPlan_Personne");

                entity.HasOne(d => d.Plan)
                    .WithMany(p => p.AuteurPlan)
                    .HasForeignKey(d => d.PlanId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_AuteurPlan_Plan");
            });

            modelBuilder.Entity<BiblioPanneau>(entity =>
            {
                entity.ToTable("BiblioPanneau", "Sarcos");

                entity.Property(e => e.Created)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Modified)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.ModifiedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Notes).HasColumnType("varchar(500)");

                entity.Property(e => e.PageDebut).HasColumnType("varchar(10)");

                entity.Property(e => e.PageFin).HasColumnType("varchar(10)");

                entity.HasOne(d => d.Document)
                    .WithMany(p => p.Panneaux)
                    .HasForeignKey(d => d.DocumentId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_BiblioPanneau_Document");

                entity.HasOne(d => d.Panneau)
                    .WithMany(p => p.Bibliographie)
                    .HasForeignKey(d => d.PanneauId)
                    .HasConstraintName("FK_BiblioPanneau_Panneau");
            });

            modelBuilder.Entity<BiblioSarcophage>(entity =>
            {
                entity.ToTable("BiblioSarcophage", "Sarcos");

                entity.Property(e => e.Created)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Modified)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.ModifiedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Notes).HasColumnType("varchar(500)");

                entity.Property(e => e.PageDebut)
                    .IsRequired()
                    .HasColumnType("varchar(10)");

                entity.Property(e => e.PageFin)
                    .IsRequired()
                    .HasColumnType("varchar(10)");

                entity.HasOne(d => d.Document)
                    .WithMany(p => p.Sarcophages)
                    .HasForeignKey(d => d.DocumentId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_BiblioSarcophage_Document");

                entity.HasOne(d => d.Sarcophage)
                    .WithMany(p => p.Bibliographie)
                    .HasForeignKey(d => d.SarcophageId)
                    .HasConstraintName("FK_BiblioSarcophage_Sarcophage");
            });

            modelBuilder.Entity<Bibliotheque>(entity =>
            {
                entity.ToTable("Bibliotheque", "Doc");

                entity.HasIndex(e => e.Nom)
                    .HasName("IX_Bibliotheque_Nom")
                    .IsUnique();

                entity.Property(e => e.Adresse).HasColumnType("varchar(255)");

                entity.Property(e => e.CodePostal).HasColumnType("varchar(50)");

                entity.Property(e => e.Created)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Modified)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.ModifiedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Nom)
                    .IsRequired()
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.Pays)
                    .IsRequired()
                    .HasColumnType("varchar(50)")
                    .HasDefaultValueSql("'France'");

                entity.Property(e => e.Ville).HasColumnType("varchar(255)");

                entity.Property(e => e.WebSite).HasColumnType("varchar(1000)");
            });

            modelBuilder.Entity<CaracterisationPlatre>(entity =>
            {
                entity.ToTable("CaracterisationPlatre", "Sarcos");

                entity.HasIndex(e => new { e.SarcophageId, e.ElementSarcophageId })
                    .HasName("IX_CaracterisationPlatre_SarcoElement")
                    .IsUnique();

                entity.Property(e => e.BullesFluidite).HasDefaultValueSql("0");

                entity.Property(e => e.BullesGachage).HasDefaultValueSql("0");

                entity.Property(e => e.Charbons).HasDefaultValueSql("0");

                entity.Property(e => e.Created)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.FragGypseIncuits).HasDefaultValueSql("0");

                entity.Property(e => e.Modified)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.ModifiedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Sable).HasDefaultValueSql("0");

                entity.HasOne(d => d.ElementSarcophage)
                    .WithMany(p => p.CaracterisationPlatre)
                    .HasForeignKey(d => d.ElementSarcophageId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_CaracterisationPlatre_ElementSarcophage");

                entity.HasOne(d => d.Finesse)
                    .WithMany(p => p.CaracterisationPlatre)
                    .HasForeignKey(d => d.FinesseId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_CaracterisationPlatre_FinessePlatre");

                entity.HasOne(d => d.Sarcophage)
                    .WithMany(p => p.CaracterisationPlatre)
                    .HasForeignKey(d => d.SarcophageId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_CaracterisationPlatre_Sarcophage");

                entity.HasOne(d => d.TailleBullesFluidite)
                    .WithMany(p => p.CaracterisationPlatreTailleBullesFluidite)
                    .HasForeignKey(d => d.TailleBullesFluiditeId)
                    .HasConstraintName("FK_CaracterisationPlatre_IndicateurTaille_BullesFluidite");

                entity.HasOne(d => d.TailleBullesGachage)
                    .WithMany(p => p.CaracterisationPlatreTailleBullesGachage)
                    .HasForeignKey(d => d.TailleBullesGachageId)
                    .HasConstraintName("FK_CaracterisationPlatre_IndicateurTaille_BullesGachage");

                entity.HasOne(d => d.TailleCharbons)
                    .WithMany(p => p.CaracterisationPlatreTailleCharbons)
                    .HasForeignKey(d => d.TailleCharbonsId)
                    .HasConstraintName("FK_CaracterisationPlatre_IndicateurTaille_Charbons");

                entity.HasOne(d => d.TailleFragGypseIncuits)
                    .WithMany(p => p.CaracterisationPlatreTailleFragGypseIncuits)
                    .HasForeignKey(d => d.TailleFragGypseIncuitsId)
                    .HasConstraintName("FK_CaracterisationPlatre_IndicateurTaille_FragGypse");
            });

            modelBuilder.Entity<Commune>(entity =>
            {
                entity.HasKey(e => e.Code)
                    .HasName("PK_Commune");

                entity.ToTable("Commune", "Ops");

                entity.HasIndex(e => new { e.Departement, e.Nom })
                    .HasName("IX_Commune_Nom")
                    .IsUnique();

                entity.Property(e => e.Code).ValueGeneratedNever();

                entity.Property(e => e.Nom)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.HasOne(d => d.DepartementNavigation)
                    .WithMany(p => p.Communes)
                    .HasForeignKey(d => d.Departement)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Commune_Departement");
            });

            modelBuilder.Entity<Couvercle>(entity =>
            {
                entity.HasKey(e => e.SarcophageId)
                    .HasName("PK_Couvercle");

                entity.ToTable("Couvercle", "Sarcos");

                entity.Property(e => e.SarcophageId).ValueGeneratedNever();

                entity.Property(e => e.Created)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.DescriptionDecor).HasColumnType("varchar(3000)");

                entity.Property(e => e.DescriptionTracesDecor).HasColumnType("varchar(3000)");

                entity.Property(e => e.EstDecore).HasDefaultValueSql("0");

                entity.Property(e => e.Modified)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.ModifiedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Notes).HasColumnType("varchar(2000)");

                entity.Property(e => e.PresenceArmatures).HasDefaultValueSql("0");

                entity.Property(e => e.TracesDecor).HasDefaultValueSql("0");

                entity.HasOne(d => d.Sarcophage)
                    .WithOne(p => p.Couvercle)
                    .HasForeignKey<Couvercle>(d => d.SarcophageId)
                    .HasConstraintName("FK_Couvercle_Sarcophage");

                entity.HasOne(d => d.Type)
                    .WithMany(p => p.Couvercle)
                    .HasForeignKey(d => d.TypeId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Couvercle_TypeCouvercle");
            });

            modelBuilder.Entity<Departement>(entity =>
            {
                entity.HasKey(e => e.Numero)
                    .HasName("PK_Departement");

                entity.ToTable("Departement", "Ops");

                entity.HasIndex(e => e.Nom)
                    .HasName("IX_Departement_Nom")
                    .IsUnique();

                entity.Property(e => e.Numero).ValueGeneratedNever();

                entity.Property(e => e.Nom)
                    .IsRequired()
                    .HasColumnType("varchar(50)");
            });

            modelBuilder.Entity<Document>(entity =>
            {
                entity.ToTable("Document", "Doc");

                entity.HasIndex(e => e.Titre)
                    .HasName("IX_Document_Titre");

                entity.HasIndex(e => e.UniqueTag)
                    .HasName("IX_Document_UniqueTag")
                    .IsUnique();

                entity.Property(e => e.Created)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.DateEdition).HasColumnType("date");

                entity.Property(e => e.DatePeriodique).HasColumnType("date");

                entity.Property(e => e.Editeur).HasColumnType("varchar(255)");

                entity.Property(e => e.Identifiant).HasColumnType("varchar(20)");

                entity.Property(e => e.LieuEdition).HasColumnType("varchar(255)");

                entity.Property(e => e.Modified)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.ModifiedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Notes).HasColumnType("varchar(5000)");

                entity.Property(e => e.Tags).HasColumnType("varchar(1000)");

                entity.Property(e => e.Titre)
                    .IsRequired()
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.Titre2).HasColumnType("varchar(255)");

                entity.Property(e => e.TypeDocumentId).HasDefaultValueSql("1");

                entity.Property(e => e.TypeIdentifiant).HasColumnType("varchar(5)");

                entity.Property(e => e.Url)
                    .HasColumnName("URL")
                    .HasColumnType("varchar(1000)");

                entity.HasOne(d => d.Parent)
                    .WithMany(p => p.InverseParent)
                    .HasForeignKey(d => d.ParentId)
                    .HasConstraintName("FK_Document_Document_Parent");

                entity.HasOne(d => d.TypeDocument)
                    .WithMany(p => p.Document)
                    .HasForeignKey(d => d.TypeDocumentId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Document_TypeDocument");
            });

            modelBuilder.Entity<ElementSarcophage>(entity =>
            {
                entity.ToTable("ElementSarcophage", "Sarcos");

                entity.HasIndex(e => e.Nom)
                    .HasName("IX_ElementSarcophage_Nom")
                    .IsUnique();

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Nom)
                    .IsRequired()
                    .HasColumnType("varchar(50)");
            });

            modelBuilder.Entity<ExemplaireDocument>(entity =>
            {
                entity.HasKey(e => new { e.DocumentId, e.BibliothequeId })
                    .HasName("PK_ExemplaireDocument");

                entity.ToTable("ExemplaireDocument", "Doc");

                entity.Property(e => e.Created)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Modified)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.ModifiedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Reference).HasColumnType("varchar(50)");

                entity.HasOne(d => d.Bibliotheque)
                    .WithMany(p => p.ExemplaireDocument)
                    .HasForeignKey(d => d.BibliothequeId)
                    .HasConstraintName("FK_ExemplaireDocument_Bibliotheque");

                entity.HasOne(d => d.Document)
                    .WithMany(p => p.Exemplaires)
                    .HasForeignKey(d => d.DocumentId)
                    .HasConstraintName("FK_ExemplaireDocument_Document");
            });

            modelBuilder.Entity<FinessePlatre>(entity =>
            {
                entity.ToTable("FinessePlatre", "Sarcos");

                entity.HasIndex(e => e.Nom)
                    .HasName("IX_FinessePlatre_Nom")
                    .IsUnique();

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Nom)
                    .IsRequired()
                    .HasColumnType("varchar(50)");
            });

            modelBuilder.Entity<IdentificationOperation>(entity =>
            {
                entity.HasKey(e => new { e.OperationId, e.ReferentielId })
                    .HasName("PK_IdentificationOperation");

                entity.ToTable("IdentificationOperation", "Ops");

                entity.HasIndex(e => new { e.OperationId, e.ReferentielId, e.Reference })
                    .HasName("IX_IdentificationOperation_Reference")
                    .IsUnique();

                entity.Property(e => e.Created)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Modified)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.ModifiedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Reference)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.HasOne(d => d.Operation)
                    .WithMany(p => p.Identifications)
                    .HasForeignKey(d => d.OperationId)
                    .HasConstraintName("FK_IdentificationOperation_OperationArcheo");

                entity.HasOne(d => d.Referentiel)
                    .WithMany(p => p.IdentificationOperation)
                    .HasForeignKey(d => d.ReferentielId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_IdentificationOperation_ReferentielIdentification");
            });

            modelBuilder.Entity<IdentificationPanneau>(entity =>
            {
                entity.HasKey(e => new { e.PanneauId, e.ReferentielId, e.Reference })
                    .HasName("IX_IdentificationPanneau_Reference");

                entity.ToTable("IdentificationPanneau", "Sarcos");

                entity.Property(e => e.Reference).HasColumnType("varchar(50)");

                entity.Property(e => e.Created)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Modified)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.ModifiedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.HasOne(d => d.Panneau)
                    .WithMany(p => p.Identifications)
                    .HasForeignKey(d => d.PanneauId)
                    .HasConstraintName("FK_IdentificationPanneau_Panneau");

                entity.HasOne(d => d.Referentiel)
                    .WithMany(p => p.IdentificationPanneau)
                    .HasForeignKey(d => d.ReferentielId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_IdentificationPanneau_ReferentielIdentification");
            });

            modelBuilder.Entity<IdentificationSarcophage>(entity =>
            {
                entity.HasKey(e => new { e.SarcophageId, e.ReferentielId })
                    .HasName("PK_IdentificationSarcophage");

                entity.ToTable("IdentificationSarcophage", "Sarcos");

                entity.HasIndex(e => new { e.SarcophageId, e.ReferentielId, e.Reference })
                    .HasName("IX_IdentificationSarcophage_Reference")
                    .IsUnique();

                entity.Property(e => e.Created)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Modified)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.ModifiedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Reference)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.HasOne(d => d.Referentiel)
                    .WithMany(p => p.IdentificationSarcophage)
                    .HasForeignKey(d => d.ReferentielId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_IdentificationSarcophage_ReferentielIdentification");

                entity.HasOne(d => d.Sarcophage)
                    .WithMany(p => p.Identifications)
                    .HasForeignKey(d => d.SarcophageId)
                    .HasConstraintName("FK_IdentificationSarcophage_Sarcophage");
            });

            modelBuilder.Entity<IdentificationSite>(entity =>
            {
                entity.HasKey(e => new { e.SiteId, e.ReferentielId })
                    .HasName("PK_IdentificationSite");

                entity.ToTable("IdentificationSite", "Ops");

                entity.HasIndex(e => new { e.SiteId, e.ReferentielId, e.Reference })
                    .HasName("IX_IdentificationSite_Reference")
                    .IsUnique();

                entity.Property(e => e.Created)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Modified)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.ModifiedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Reference)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.HasOne(d => d.Referentiel)
                    .WithMany(p => p.IdentificationSite)
                    .HasForeignKey(d => d.ReferentielId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_IdentificationSite_ReferentielIdentification");

                entity.HasOne(d => d.Site)
                    .WithMany(p => p.Identifications)
                    .HasForeignKey(d => d.SiteId)
                    .HasConstraintName("FK_IdentificationSite_SiteArcheo");
            });

            modelBuilder.Entity<Illustration>(entity =>
            {
                entity.ToTable("Illustration", "Illus");

                entity.Property(e => e.Auteur)
                    .HasColumnType("varchar(100)")
                    .HasDefaultValueSql("'Inconnu'");

                entity.Property(e => e.Chemin)
                    .IsRequired()
                    .HasColumnType("varchar(500)");

                entity.Property(e => e.Created)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Modified)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.ModifiedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Notes).HasColumnType("varchar(2000)");

                entity.Property(e => e.Page).HasColumnType("varchar(10)");

                entity.HasOne(d => d.Document)
                    .WithMany(p => p.Illustrations)
                    .HasForeignKey(d => d.DocumentId)
                    .HasConstraintName("FK_Illustration_Document");

                entity.HasOne(d => d.Type)
                    .WithMany(p => p.Illustration)
                    .HasForeignKey(d => d.TypeId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Illustration_TypeIllustration");
            });

            modelBuilder.Entity<IllustrationCouvercle>(entity =>
            {
                entity.ToTable("IllustrationCouvercle", "Sarcos");

                entity.HasIndex(e => new { e.IllustrationId, e.CouvercleId })
                    .HasName("IX_IllustrationCouvercle_IllustrationCouvercle")
                    .IsUnique();

                entity.Property(e => e.Created)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Modified)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.ModifiedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Notes).HasColumnType("varchar(2000)");

                entity.HasOne(d => d.Couvercle)
                    .WithMany(p => p.IllustrationCouvercle)
                    .HasForeignKey(d => d.CouvercleId)
                    .HasConstraintName("FK_IllustrationCouvercle_Couvercle");

                entity.HasOne(d => d.Illustration)
                    .WithMany(p => p.IllustrationCouvercle)
                    .HasForeignKey(d => d.IllustrationId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_IllustrationCouvercle_Illustration");
            });

            modelBuilder.Entity<IllustrationPanneau>(entity =>
            {
                entity.ToTable("IllustrationPanneau", "Sarcos");

                entity.HasIndex(e => new { e.IllustrationId, e.PanneauId })
                    .HasName("IX_IllustrationPanneau_IllustrationPanneau")
                    .IsUnique();

                entity.Property(e => e.Created)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.EstInterieur).HasDefaultValueSql("0");

                entity.Property(e => e.Modified)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.ModifiedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Notes).HasColumnType("varchar(2000)");

                entity.Property(e => e.Principale).HasDefaultValueSql("0");

                entity.HasOne(d => d.Illustration)
                    .WithMany(p => p.IllustrationPanneau)
                    .HasForeignKey(d => d.IllustrationId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_IllustrationPanneau_Illustration");

                entity.HasOne(d => d.Panneau)
                    .WithMany(p => p.Illustrations)
                    .HasForeignKey(d => d.PanneauId)
                    .HasConstraintName("FK_IllustrationPanneau_Panneau");
            });

            modelBuilder.Entity<IllustrationSarcophage>(entity =>
            {
                entity.ToTable("IllustrationSarcophage", "Sarcos");

                entity.HasIndex(e => new { e.IllustrationId, e.SarcophageId })
                    .HasName("IX_IllustrationSarcophage_IllustrationSarcophage")
                    .IsUnique();

                entity.Property(e => e.Created)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Modified)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.ModifiedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Notes).HasColumnType("varchar(2000)");

                entity.HasOne(d => d.Illustration)
                    .WithMany(p => p.IllustrationSarcophage)
                    .HasForeignKey(d => d.IllustrationId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_IllustrationSarcophage_Illustration");

                entity.HasOne(d => d.Sarcophage)
                    .WithMany(p => p.Illustrations)
                    .HasForeignKey(d => d.SarcophageId)
                    .HasConstraintName("FK_IllustrationSarcophage_Sarcophage");
            });

            modelBuilder.Entity<IndicateurTaille>(entity =>
            {
                entity.ToTable("IndicateurTaille", "Sarcos");

                entity.HasIndex(e => e.Nom)
                    .HasName("IX_IndicateurTaille_Nom")
                    .IsUnique();

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Nom)
                    .IsRequired()
                    .HasColumnType("varchar(50)");
            });

            modelBuilder.Entity<MiseEnOeuvre>(entity =>
            {
                entity.ToTable("MiseEnOeuvre", "Sarcos");

                entity.HasIndex(e => e.Nom)
                    .HasName("IX_MiseEnOeuvre_Nom")
                    .IsUnique();

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Nom)
                    .IsRequired()
                    .HasColumnType("varchar(50)");
            });

            modelBuilder.Entity<OperationArcheo>(entity =>
            {
                entity.ToTable("OperationArcheo", "Ops");

                entity.HasIndex(e => e.UniqueTag)
                    .HasName("IX_OperationArcheo_UniqueTag")
                    .IsUnique();

                entity.HasIndex(e => new { e.SiteId, e.Localisation, e.DebutTravaux, e.FinTravaux, e.ResponsableId })
                    .HasName("IX_OperationArcheo_Localisation")
                    .IsUnique();

                entity.Property(e => e.Created)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.DebutTravaux)
                    .IsRequired()
                    .HasColumnType("date");

                entity.Property(e => e.FinTravaux)
                    .IsRequired()
                    .HasColumnType("date");

                entity.Property(e => e.Localisation)
                    .IsRequired()
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Modified)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.ModifiedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.ResponsableId).IsRequired();

                entity.HasOne(d => d.Commune)
                    .WithMany(p => p.OperationArcheo)
                    .HasForeignKey(d => d.CodeCommune)
                    .HasConstraintName("FK_OperationArcheo_Commune");

                entity.HasOne(d => d.DebutOccupation)
                    .WithMany(p => p.OperationArcheoDebutOccupation)
                    .HasForeignKey(d => d.DebutOccupationId)
                    .HasConstraintName("FK_OperationArcheo_PhaseChronologique_Debut");

                entity.HasOne(d => d.FinOccupation)
                    .WithMany(p => p.OperationArcheoFinOccupation)
                    .HasForeignKey(d => d.FinOccupationId)
                    .HasConstraintName("FK_OperationArcheo_PhaseChronologique_Fin");

                entity.HasOne(d => d.Organisme)
                    .WithMany(p => p.OperationArcheo)
                    .HasForeignKey(d => d.OrganismeId)
                    .HasConstraintName("FK_OperationArcheo_Organisme");

                entity.HasOne(d => d.Plan)
                    .WithMany(p => p.OperationArcheo)
                    .HasForeignKey(d => d.PlanId)
                    .HasConstraintName("FK_OperationArcheo_Plan");

                entity.HasOne(d => d.Responsable)
                    .WithMany(p => p.OperationArcheo)
                    .HasForeignKey(d => d.ResponsableId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_OperationArcheo_Personne");

                entity.HasOne(d => d.Site)
                    .WithMany(p => p.Operations)
                    .HasForeignKey(d => d.SiteId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_OperationArcheo_SiteArcheo");
            });

            modelBuilder.Entity<Organisme>(entity =>
            {
                entity.ToTable("Organisme", "Pers");

                entity.HasIndex(e => e.Nom)
                    .HasName("IX_Organisme_Nom")
                    .IsUnique();

                entity.HasIndex(e => e.UniqueTag)
                    .HasName("IX_Organisme_UniqueTag")
                    .IsUnique();

                entity.Property(e => e.Abreviation).HasColumnType("varchar(20)");

                entity.Property(e => e.Created)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Modified)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.ModifiedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Nom)
                    .IsRequired()
                    .HasColumnType("varchar(50)");
            });

            modelBuilder.Entity<Panneau>(entity =>
            {
                entity.ToTable("Panneau", "Sarcos");

                entity.HasIndex(e => new { e.SarcophageId, e.PositionId })
                    .HasName("IX_Panneau_SarcoPosition")
                    .IsUnique();

                entity.Property(e => e.Created)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Description).HasColumnType("varchar(3000)");

                entity.Property(e => e.EpaisseurPartielle).HasDefaultValueSql("0");

                entity.Property(e => e.HauteurPartielle).HasDefaultValueSql("0");

                entity.Property(e => e.LongueurPartielle).HasDefaultValueSql("0");

                entity.Property(e => e.Modified)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.ModifiedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Notes).HasColumnType("varchar(2000)");

                entity.Property(e => e.PositionId).IsRequired();

                entity.HasOne(d => d.Position)
                    .WithMany(p => p.Panneau)
                    .HasForeignKey(d => d.PositionId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Panneau_PositionPanneau");

                entity.HasOne(d => d.Sarcophage)
                    .WithMany(p => p.Panneaux)
                    .HasForeignKey(d => d.SarcophageId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Panneau_Sarcophage");
            });

            modelBuilder.Entity<Personne>(entity =>
            {
                entity.ToTable("Personne", "Pers");

                entity.HasIndex(e => e.UniqueTag)
                    .HasName("IX_Personne_UniqueTag")
                    .IsUnique();

                entity.HasIndex(e => new { e.Nom, e.Prenom, e.AutresPrenoms, e.Suffixe, e.NomComplet })
                    .HasName("IX_Personne_Nom")
                    .IsUnique();

                entity.Property(e => e.AutresPrenoms)
                    .IsRequired()
                    .HasColumnType("varchar(200)");

                entity.Property(e => e.Created)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Modified)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.ModifiedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Nom)
                    .IsRequired()
                    .HasColumnType("varchar(200)");

                entity.Property(e => e.NomComplet)
                    .IsRequired()
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.Prenom)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Suffixe)
                    .IsRequired()
                    .HasColumnType("varchar(10)");

                entity.HasOne(d => d.Organisme)
                    .WithMany(p => p.Personne)
                    .HasForeignKey(d => d.OrganismeId)
                    .HasConstraintName("FK_Personne_Organisme");
            });

            modelBuilder.Entity<PhaseChronologique>(entity =>
            {
                entity.ToTable("PhaseChronologique", "Chrono");

                entity.HasIndex(e => e.Code)
                    .HasName("IX_PhaseChronologique_Code")
                    .IsUnique();

                entity.HasIndex(e => e.Nom)
                    .HasName("IX_PhaseChronologique_Nom")
                    .IsUnique();

                entity.HasIndex(e => new { e.Debut, e.Fin })
                    .HasName("IX_PhaseChronologique_Dates")
                    .IsUnique();

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasColumnType("varchar(10)");

                entity.Property(e => e.Nom)
                    .IsRequired()
                    .HasColumnType("varchar(50)");
            });

            modelBuilder.Entity<Plan>(entity =>
            {
                entity.ToTable("Plan", "Ops");

                entity.Property(e => e.Chemin)
                    .IsRequired()
                    .HasColumnType("varchar(500)");

                entity.Property(e => e.Created)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.DateRealisation).HasColumnType("date");

                entity.Property(e => e.Modified)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.ModifiedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.HasOne(d => d.Document)
                    .WithMany(p => p.Plans)
                    .HasForeignKey(d => d.DocumentId)
                    .HasConstraintName("FK_Plan_Document");
            });

            modelBuilder.Entity<PositionPanneau>(entity =>
            {
                entity.ToTable("PositionPanneau", "Sarcos");

                entity.HasIndex(e => e.Nom)
                    .HasName("IX_PositionPanneau_Nom")
                    .IsUnique();

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Nom)
                    .IsRequired()
                    .HasColumnType("varchar(50)");
            });

            modelBuilder.Entity<Qualite>(entity =>
            {
                entity.ToTable("Qualite", "Sarcos");

                entity.HasIndex(e => e.Nom)
                    .HasName("IX_Qualite_Nom")
                    .IsUnique();

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Nom)
                    .IsRequired()
                    .HasColumnType("varchar(50)");
            });

            modelBuilder.Entity<ReferentielIdentificationSarcophages>(entity =>
            {
                entity.ToTable("ReferentielIdentification", "Sarcos");

                entity.HasIndex(e => e.Nom)
                    .HasName("IX_ReferentielIdentification_Nom")
                    .IsUnique();

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Created)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Modified)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.ModifiedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Nom)
                    .IsRequired()
                    .HasColumnType("varchar(100)");
            });

            modelBuilder.Entity<ReferentielIdentificationSites>(entity =>
            {
                entity.ToTable("ReferentielIdentification", "Ops");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Created)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Modified)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.ModifiedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Nom)
                    .IsRequired()
                    .HasColumnType("varchar(100)");
            });

            modelBuilder.Entity<RisDocumentType>(entity =>
            {
                entity.HasKey(e => e.TypeDocumentId)
                    .HasName("PK_RIS_DocumentType");

                entity.ToTable("RIS_DocumentType", "Doc");

                entity.Property(e => e.TypeDocumentId).ValueGeneratedNever();

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasColumnType("varchar(5)");

                entity.HasOne(d => d.TypeDocument)
                    .WithOne(p => p.RisDocumentType)
                    .HasForeignKey<RisDocumentType>(d => d.TypeDocumentId)
                    .HasConstraintName("FK_RIS_DocumentType_TypeDocument");
            });

            modelBuilder.Entity<Sarcophage>(entity =>
            {
                entity.ToTable("Sarcophage", "Sarcos");

                entity.HasIndex(e => e.OperationId)
                    .HasName("IX_Sarcophage_Operation");

                entity.Property(e => e.Created)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.DescAmenagementCephalique).HasColumnType("varchar(250)");

                entity.Property(e => e.Modified)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.ModifiedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Notes).HasColumnType("varchar(2000)");

                entity.HasOne(d => d.MiseEnOeuvre)
                    .WithMany(p => p.Sarcophage)
                    .HasForeignKey(d => d.MiseEnOeuvreId)
                    .HasConstraintName("FK_Sarcophage_MiseEnOeuvre");

                entity.HasOne(d => d.Operation)
                    .WithMany(p => p.Sarcophages)
                    .HasForeignKey(d => d.OperationId)
                    .HasConstraintName("FK_Sarcophage_OperationArcheo");

                entity.HasOne(d => d.QualiteCuve)
                    .WithMany(p => p.SarcophageQualiteCuve)
                    .HasForeignKey(d => d.QualiteCuveId)
                    .HasConstraintName("FK_Sarcophage_Qualite_Cuve");

                entity.HasOne(d => d.QualiteDecorCuve)
                    .WithMany(p => p.SarcophageQualiteDecorCuve)
                    .HasForeignKey(d => d.QualiteDecorCuveId)
                    .HasConstraintName("FK_Sarcophage_Qualite_DecorCuve");

                entity.HasOne(d => d.Site)
                    .WithMany(p => p.Sarcophages)
                    .HasForeignKey(d => d.SiteId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Sarcophage_SiteArcheo");

                entity.HasOne(d => d.VisibiliteCuve)
                    .WithMany(p => p.Sarcophage)
                    .HasForeignKey(d => d.VisibiliteCuveId)
                    .HasConstraintName("FK_Sarcophage_VisibiliteCuve");
            });

            modelBuilder.Entity<SiteArcheo>(entity =>
            {
                entity.ToTable("SiteArcheo", "Ops");

                entity.Property(e => e.Created)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Localisation)
                    .IsRequired()
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Modified)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.ModifiedBy)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.HasOne(d => d.Commune)
                    .WithMany(p => p.SiteArcheo)
                    .HasForeignKey(d => d.CodeCommune)
                    .HasConstraintName("FK_SiteArcheo_Commune");

                entity.HasOne(d => d.DebutOccupation)
                    .WithMany(p => p.SiteArcheoDebutOccupation)
                    .HasForeignKey(d => d.DebutOccupationId)
                    .HasConstraintName("FK_SiteArcheo_PhaseChronologique_Debut");

                entity.HasOne(d => d.FinOccupation)
                    .WithMany(p => p.SiteArcheoFinOccupation)
                    .HasForeignKey(d => d.FinOccupationId)
                    .HasConstraintName("FK_SiteArcheo_PhaseChronologique_Fin");

                entity.HasOne(d => d.Plan)
                    .WithMany(p => p.SiteArcheo)
                    .HasForeignKey(d => d.PlanId)
                    .HasConstraintName("FK_SiteArcheo_Plan");
            });

            modelBuilder.Entity<TypeCouvercle>(entity =>
            {
                entity.ToTable("TypeCouvercle", "Sarcos");

                entity.HasIndex(e => e.Nom)
                    .HasName("IX_TypeCouvercle_Nom")
                    .IsUnique();

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Nom)
                    .IsRequired()
                    .HasColumnType("varchar(50)");
            });

            modelBuilder.Entity<TypeDocument>(entity =>
            {
                entity.ToTable("TypeDocument", "Doc");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Nom)
                    .IsRequired()
                    .HasColumnType("varchar(255)");
            });

            modelBuilder.Entity<TypeIllustration>(entity =>
            {
                entity.ToTable("TypeIllustration", "Illus");

                entity.HasIndex(e => e.Nom)
                    .HasName("IX_TypeIllustration_Nom")
                    .IsUnique();

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Nom)
                    .IsRequired()
                    .HasColumnType("varchar(50)");
            });

            modelBuilder.Entity<VisibiliteCuve>(entity =>
            {
                entity.ToTable("VisibiliteCuve", "Sarcos");

                entity.HasIndex(e => e.Nom)
                    .HasName("IX_VisibiliteCuve_Nom")
                    .IsUnique();

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Nom)
                    .IsRequired()
                    .HasColumnType("varchar(50)");
            });

            //TODO: Find a way to manage ad-hoc types outside of this method
            modelBuilder.Entity<IllustrationPanneauSummary>(entity => 
            {
                entity.HasKey(e => e.IllustrationId);
            });
        }

        public virtual DbSet<Auteur> Auteur { get; set; }
        public virtual DbSet<AuteurPlan> AuteurPlan { get; set; }
        public virtual DbSet<BiblioPanneau> BiblioPanneau { get; set; }
        public virtual DbSet<BiblioSarcophage> BiblioSarcophage { get; set; }
        public virtual DbSet<Bibliotheque> Bibliotheque { get; set; }
        public virtual DbSet<CaracterisationPlatre> CaracterisationPlatre { get; set; }
        public virtual DbSet<Commune> Commune { get; set; }
        public virtual DbSet<Couvercle> Couvercle { get; set; }
        public virtual DbSet<Departement> Departement { get; set; }
        public virtual DbSet<Document> Document { get; set; }
        public virtual DbSet<ElementSarcophage> ElementSarcophage { get; set; }
        public virtual DbSet<ExemplaireDocument> ExemplaireDocument { get; set; }
        public virtual DbSet<FinessePlatre> FinessePlatre { get; set; }
        public virtual DbSet<IdentificationOperation> IdentificationOperation { get; set; }
        public virtual DbSet<IdentificationPanneau> IdentificationPanneau { get; set; }
        public virtual DbSet<IdentificationSarcophage> IdentificationSarcophage { get; set; }
        public virtual DbSet<IdentificationSite> IdentificationSite { get; set; }
        public virtual DbSet<Illustration> Illustration { get; set; }
        public virtual DbSet<IllustrationCouvercle> IllustrationCouvercle { get; set; }
        public virtual DbSet<IllustrationPanneau> IllustrationPanneau { get; set; }
        public virtual DbSet<IllustrationSarcophage> IllustrationSarcophage { get; set; }
        public virtual DbSet<IndicateurTaille> IndicateurTaille { get; set; }
        public virtual DbSet<MiseEnOeuvre> MiseEnOeuvre { get; set; }
        public virtual DbSet<OperationArcheo> OperationArcheo { get; set; }
        public virtual DbSet<Organisme> Organisme { get; set; }
        public virtual DbSet<Panneau> Panneau { get; set; }
        public virtual DbSet<Personne> Personne { get; set; }
        public virtual DbSet<PhaseChronologique> PhaseChronologique { get; set; }
        public virtual DbSet<Plan> Plan { get; set; }
        public virtual DbSet<PositionPanneau> PositionPanneau { get; set; }
        public virtual DbSet<Qualite> Qualite { get; set; }
        public virtual DbSet<ReferentielIdentificationSarcophages> ReferentielIdentification { get; set; }
        public virtual DbSet<ReferentielIdentificationSites> ReferentielIdentification1 { get; set; }
        public virtual DbSet<RisDocumentType> RisDocumentType { get; set; }
        public virtual DbSet<Sarcophage> Sarcophage { get; set; }
        public virtual DbSet<SiteArcheo> SiteArcheo { get; set; }
        public virtual DbSet<TypeCouvercle> TypeCouvercle { get; set; }
        public virtual DbSet<TypeDocument> TypeDocument { get; set; }
        public virtual DbSet<TypeIllustration> TypeIllustration { get; set; }
        public virtual DbSet<VisibiliteCuve> VisibiliteCuve { get; set; }
    }
}