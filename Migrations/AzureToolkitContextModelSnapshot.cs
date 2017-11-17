﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;
using WebApplicationBasic.Models;

namespace AzureToolKit.Migrations
{
    [DbContext(typeof(AzureToolkitContext))]
    partial class AzureToolkitContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebApplicationBasic.Models.SavedImage", b =>
                {
                    b.Property<int>("SavedImageId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("StorageUrl");

                    b.Property<string>("UserId");

                    b.HasKey("SavedImageId");

                    b.ToTable("SavedImages");
                });

            modelBuilder.Entity("WebApplicationBasic.Models.SavedImageTag", b =>
                {
                    b.Property<int>("SavedImageTagId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("SavedImageId");

                    b.Property<string>("Tag");

                    b.HasKey("SavedImageTagId");

                    b.HasIndex("SavedImageId");

                    b.ToTable("SavedImageTags");
                });

            modelBuilder.Entity("WebApplicationBasic.Models.SavedImageTag", b =>
                {
                    b.HasOne("WebApplicationBasic.Models.SavedImage")
                        .WithMany("Tags")
                        .HasForeignKey("SavedImageId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
