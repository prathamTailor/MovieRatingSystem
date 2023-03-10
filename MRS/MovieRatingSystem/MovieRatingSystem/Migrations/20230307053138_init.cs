using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MovieRatingSystem.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Admin",
                columns: table => new
                {
                    adminId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    adminName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    aEmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordHash = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    PasswordSalt = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    aFirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    aLastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    aMiddleName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    aGender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    aDOB = table.Column<DateTime>(type: "datetime2", nullable: false),
                    aCity = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    aCountry = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    imgUrl = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admin", x => x.adminId);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    userId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    userName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    uEmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordHash = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    PasswordSalt = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    uFirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    uLastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    uMiddleName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    uGender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    uDOB = table.Column<DateTime>(type: "datetime2", nullable: false),
                    uCity = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    uCountry = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    imgUrl = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.userId);
                });

            migrationBuilder.CreateTable(
                name: "Celebrity",
                columns: table => new
                {
                    celebrityId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    celebrityName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    gender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    dob = table.Column<DateTime>(type: "datetime2", nullable: false),
                    birthPlace = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    imgUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    adminId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Celebrity", x => x.celebrityId);
                    table.ForeignKey(
                        name: "FK_Celebrity_Admin_adminId",
                        column: x => x.adminId,
                        principalTable: "Admin",
                        principalColumn: "adminId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Movies",
                columns: table => new
                {
                    movieId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    movieName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    movieType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    movieReleaseYear = table.Column<int>(type: "int", nullable: false),
                    movieRating = table.Column<float>(type: "real", nullable: false),
                    movieDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    trailerUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    imgUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    reviewCount = table.Column<int>(type: "int", nullable: false),
                    adminId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Movies", x => x.movieId);
                    table.ForeignKey(
                        name: "FK_Movies_Admin_adminId",
                        column: x => x.adminId,
                        principalTable: "Admin",
                        principalColumn: "adminId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Role",
                columns: table => new
                {
                    roleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    roleName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    roleDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    adminId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.roleId);
                    table.ForeignKey(
                        name: "FK_Role_Admin_adminId",
                        column: x => x.adminId,
                        principalTable: "Admin",
                        principalColumn: "adminId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MovieCelebrities",
                columns: table => new
                {
                    movieCelebrityId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    movieId = table.Column<int>(type: "int", nullable: true),
                    celebrityId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MovieCelebrities", x => x.movieCelebrityId);
                    table.ForeignKey(
                        name: "FK_MovieCelebrities_Celebrity_celebrityId",
                        column: x => x.celebrityId,
                        principalTable: "Celebrity",
                        principalColumn: "celebrityId");
                    table.ForeignKey(
                        name: "FK_MovieCelebrities_Movies_movieId",
                        column: x => x.movieId,
                        principalTable: "Movies",
                        principalColumn: "movieId");
                });

            migrationBuilder.CreateTable(
                name: "Review",
                columns: table => new
                {
                    reviewId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    rating = table.Column<int>(type: "int", nullable: false),
                    reviewDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    userId = table.Column<int>(type: "int", nullable: false),
                    movieId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Review", x => x.reviewId);
                    table.ForeignKey(
                        name: "FK_Review_Movies_movieId",
                        column: x => x.movieId,
                        principalTable: "Movies",
                        principalColumn: "movieId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Review_User_userId",
                        column: x => x.userId,
                        principalTable: "User",
                        principalColumn: "userId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CelebrityRoles",
                columns: table => new
                {
                    celebrityRoleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    celebrityId = table.Column<int>(type: "int", nullable: true),
                    roleId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CelebrityRoles", x => x.celebrityRoleId);
                    table.ForeignKey(
                        name: "FK_CelebrityRoles_Celebrity_celebrityId",
                        column: x => x.celebrityId,
                        principalTable: "Celebrity",
                        principalColumn: "celebrityId");
                    table.ForeignKey(
                        name: "FK_CelebrityRoles_Role_roleId",
                        column: x => x.roleId,
                        principalTable: "Role",
                        principalColumn: "roleId");
                });

            migrationBuilder.CreateTable(
                name: "MovieRoles",
                columns: table => new
                {
                    movieRoleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    movieId = table.Column<int>(type: "int", nullable: true),
                    roleId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MovieRoles", x => x.movieRoleId);
                    table.ForeignKey(
                        name: "FK_MovieRoles_Movies_movieId",
                        column: x => x.movieId,
                        principalTable: "Movies",
                        principalColumn: "movieId");
                    table.ForeignKey(
                        name: "FK_MovieRoles_Role_roleId",
                        column: x => x.roleId,
                        principalTable: "Role",
                        principalColumn: "roleId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Celebrity_adminId",
                table: "Celebrity",
                column: "adminId");

            migrationBuilder.CreateIndex(
                name: "IX_CelebrityRoles_celebrityId",
                table: "CelebrityRoles",
                column: "celebrityId");

            migrationBuilder.CreateIndex(
                name: "IX_CelebrityRoles_roleId",
                table: "CelebrityRoles",
                column: "roleId");

            migrationBuilder.CreateIndex(
                name: "IX_MovieCelebrities_celebrityId",
                table: "MovieCelebrities",
                column: "celebrityId");

            migrationBuilder.CreateIndex(
                name: "IX_MovieCelebrities_movieId",
                table: "MovieCelebrities",
                column: "movieId");

            migrationBuilder.CreateIndex(
                name: "IX_MovieRoles_movieId",
                table: "MovieRoles",
                column: "movieId");

            migrationBuilder.CreateIndex(
                name: "IX_MovieRoles_roleId",
                table: "MovieRoles",
                column: "roleId");

            migrationBuilder.CreateIndex(
                name: "IX_Movies_adminId",
                table: "Movies",
                column: "adminId");

            migrationBuilder.CreateIndex(
                name: "IX_Review_movieId",
                table: "Review",
                column: "movieId");

            migrationBuilder.CreateIndex(
                name: "IX_Review_userId",
                table: "Review",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "IX_Role_adminId",
                table: "Role",
                column: "adminId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CelebrityRoles");

            migrationBuilder.DropTable(
                name: "MovieCelebrities");

            migrationBuilder.DropTable(
                name: "MovieRoles");

            migrationBuilder.DropTable(
                name: "Review");

            migrationBuilder.DropTable(
                name: "Celebrity");

            migrationBuilder.DropTable(
                name: "Role");

            migrationBuilder.DropTable(
                name: "Movies");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Admin");
        }
    }
}
