﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MovieRatingSystem.Models;

#nullable disable

namespace MovieRatingSystem.Migrations
{
    [DbContext(typeof(MovieRatingDbContext))]
    partial class MovieRatingDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("MovieRatingSystem.Models.Admin", b =>
                {
                    b.Property<int>("adminId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("adminId"));

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("aCity")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("aCountry")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("aDOB")
                        .HasColumnType("datetime2");

                    b.Property<string>("aEmail")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("aFirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("aGender")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("aLastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("aMiddleName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("adminName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("imgUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("adminId");

                    b.ToTable("Admin");
                });

            modelBuilder.Entity("MovieRatingSystem.Models.Celebrity", b =>
                {
                    b.Property<int>("celebrityId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("celebrityId"));

                    b.Property<int>("adminId")
                        .HasColumnType("int");

                    b.Property<string>("birthPlace")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("celebrityName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("dob")
                        .HasColumnType("datetime2");

                    b.Property<string>("gender")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("imgUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("celebrityId");

                    b.HasIndex("adminId");

                    b.ToTable("Celebrity");
                });

            modelBuilder.Entity("MovieRatingSystem.Models.CelebrityRole", b =>
                {
                    b.Property<int>("celebrityRoleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("celebrityRoleId"));

                    b.Property<int?>("celebrityId")
                        .HasColumnType("int");

                    b.Property<int?>("roleId")
                        .HasColumnType("int");

                    b.HasKey("celebrityRoleId");

                    b.HasIndex("celebrityId");

                    b.HasIndex("roleId");

                    b.ToTable("CelebrityRoles");
                });

            modelBuilder.Entity("MovieRatingSystem.Models.Movie", b =>
                {
                    b.Property<int>("movieId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("movieId"));

                    b.Property<int>("adminId")
                        .HasColumnType("int");

                    b.Property<string>("imgUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("movieDescription")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("movieName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("movieRating")
                        .HasColumnType("real");

                    b.Property<int>("movieReleaseYear")
                        .HasColumnType("int");

                    b.Property<string>("movieType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("reviewCount")
                        .HasColumnType("int");

                    b.Property<string>("trailerUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("movieId");

                    b.HasIndex("adminId");

                    b.ToTable("Movies");
                });

            modelBuilder.Entity("MovieRatingSystem.Models.MovieCelebrity", b =>
                {
                    b.Property<int>("movieCelebrityId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("movieCelebrityId"));

                    b.Property<int?>("celebrityId")
                        .HasColumnType("int");

                    b.Property<int?>("movieId")
                        .HasColumnType("int");

                    b.HasKey("movieCelebrityId");

                    b.HasIndex("celebrityId");

                    b.HasIndex("movieId");

                    b.ToTable("MovieCelebrities");
                });

            modelBuilder.Entity("MovieRatingSystem.Models.MovieCelebrityRole", b =>
                {
                    b.Property<int>("movieCelebrityRoleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("movieCelebrityRoleId"));

                    b.Property<int?>("celebrityId")
                        .HasColumnType("int");

                    b.Property<int?>("movieId")
                        .HasColumnType("int");

                    b.Property<int?>("roleId")
                        .HasColumnType("int");

                    b.HasKey("movieCelebrityRoleId");

                    b.HasIndex("celebrityId");

                    b.HasIndex("movieId");

                    b.HasIndex("roleId");

                    b.ToTable("MovieCelebrityRoles");
                });

            modelBuilder.Entity("MovieRatingSystem.Models.MovieRole", b =>
                {
                    b.Property<int>("movieRoleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("movieRoleId"));

                    b.Property<int?>("movieId")
                        .HasColumnType("int");

                    b.Property<int?>("roleId")
                        .HasColumnType("int");

                    b.HasKey("movieRoleId");

                    b.HasIndex("movieId");

                    b.HasIndex("roleId");

                    b.ToTable("MovieRoles");
                });

            modelBuilder.Entity("MovieRatingSystem.Models.Review", b =>
                {
                    b.Property<int>("reviewId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("reviewId"));

                    b.Property<int>("movieId")
                        .HasColumnType("int");

                    b.Property<int>("rating")
                        .HasColumnType("int");

                    b.Property<string>("reviewDescription")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("userId")
                        .HasColumnType("int");

                    b.HasKey("reviewId");

                    b.HasIndex("movieId");

                    b.HasIndex("userId");

                    b.ToTable("Review");
                });

            modelBuilder.Entity("MovieRatingSystem.Models.Role", b =>
                {
                    b.Property<int>("roleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("roleId"));

                    b.Property<int>("adminId")
                        .HasColumnType("int");

                    b.Property<string>("roleDescription")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("roleName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("roleId");

                    b.HasIndex("adminId");

                    b.ToTable("Role");
                });

            modelBuilder.Entity("MovieRatingSystem.Models.User", b =>
                {
                    b.Property<int>("userId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("userId"));

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("imgUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("uCity")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("uCountry")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("uDOB")
                        .HasColumnType("datetime2");

                    b.Property<string>("uEmail")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("uFirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("uGender")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("uLastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("uMiddleName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("userName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("userId");

                    b.ToTable("User");
                });

            modelBuilder.Entity("MovieRatingSystem.Models.Celebrity", b =>
                {
                    b.HasOne("MovieRatingSystem.Models.Admin", "Admin")
                        .WithMany("Celebrities")
                        .HasForeignKey("adminId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Admin");
                });

            modelBuilder.Entity("MovieRatingSystem.Models.CelebrityRole", b =>
                {
                    b.HasOne("MovieRatingSystem.Models.Celebrity", "Celebrity")
                        .WithMany("CelebrityRoles")
                        .HasForeignKey("celebrityId");

                    b.HasOne("MovieRatingSystem.Models.Role", "Role")
                        .WithMany("CelebrityRoles")
                        .HasForeignKey("roleId");

                    b.Navigation("Celebrity");

                    b.Navigation("Role");
                });

            modelBuilder.Entity("MovieRatingSystem.Models.Movie", b =>
                {
                    b.HasOne("MovieRatingSystem.Models.Admin", "Admin")
                        .WithMany("Movies")
                        .HasForeignKey("adminId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Admin");
                });

            modelBuilder.Entity("MovieRatingSystem.Models.MovieCelebrity", b =>
                {
                    b.HasOne("MovieRatingSystem.Models.Celebrity", "Celebrity")
                        .WithMany("MovieCelebrities")
                        .HasForeignKey("celebrityId");

                    b.HasOne("MovieRatingSystem.Models.Movie", "Movie")
                        .WithMany("MovieCelebrities")
                        .HasForeignKey("movieId");

                    b.Navigation("Celebrity");

                    b.Navigation("Movie");
                });

            modelBuilder.Entity("MovieRatingSystem.Models.MovieCelebrityRole", b =>
                {
                    b.HasOne("MovieRatingSystem.Models.Celebrity", "Celebrity")
                        .WithMany()
                        .HasForeignKey("celebrityId");

                    b.HasOne("MovieRatingSystem.Models.Movie", "Movie")
                        .WithMany()
                        .HasForeignKey("movieId");

                    b.HasOne("MovieRatingSystem.Models.Role", "Role")
                        .WithMany()
                        .HasForeignKey("roleId");

                    b.Navigation("Celebrity");

                    b.Navigation("Movie");

                    b.Navigation("Role");
                });

            modelBuilder.Entity("MovieRatingSystem.Models.MovieRole", b =>
                {
                    b.HasOne("MovieRatingSystem.Models.Movie", "Movie")
                        .WithMany("MovieRoles")
                        .HasForeignKey("movieId");

                    b.HasOne("MovieRatingSystem.Models.Role", "Role")
                        .WithMany("MovieRoles")
                        .HasForeignKey("roleId");

                    b.Navigation("Movie");

                    b.Navigation("Role");
                });

            modelBuilder.Entity("MovieRatingSystem.Models.Review", b =>
                {
                    b.HasOne("MovieRatingSystem.Models.Movie", "Movie")
                        .WithMany()
                        .HasForeignKey("movieId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MovieRatingSystem.Models.User", "User")
                        .WithMany("Reviews")
                        .HasForeignKey("userId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Movie");

                    b.Navigation("User");
                });

            modelBuilder.Entity("MovieRatingSystem.Models.Role", b =>
                {
                    b.HasOne("MovieRatingSystem.Models.Admin", "Admin")
                        .WithMany("Roles")
                        .HasForeignKey("adminId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Admin");
                });

            modelBuilder.Entity("MovieRatingSystem.Models.Admin", b =>
                {
                    b.Navigation("Celebrities");

                    b.Navigation("Movies");

                    b.Navigation("Roles");
                });

            modelBuilder.Entity("MovieRatingSystem.Models.Celebrity", b =>
                {
                    b.Navigation("CelebrityRoles");

                    b.Navigation("MovieCelebrities");
                });

            modelBuilder.Entity("MovieRatingSystem.Models.Movie", b =>
                {
                    b.Navigation("MovieCelebrities");

                    b.Navigation("MovieRoles");
                });

            modelBuilder.Entity("MovieRatingSystem.Models.Role", b =>
                {
                    b.Navigation("CelebrityRoles");

                    b.Navigation("MovieRoles");
                });

            modelBuilder.Entity("MovieRatingSystem.Models.User", b =>
                {
                    b.Navigation("Reviews");
                });
#pragma warning restore 612, 618
        }
    }
}
